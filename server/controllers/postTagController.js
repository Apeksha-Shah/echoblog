import PostTag from '../models/postTagModel.js';


const addTagToPost = async (req, res) => {
    const { post_id, tag_id } = req.body;

    if (!post_id || !tag_id) {
        return res.status(400).json('Post ID and Tag ID are required');
    }

    try {
        const newPostTag = new PostTag({ post_id, tag_id });
        await newPostTag.save();
        res.status(201).json('Tag added to post');
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};


const removeTagFromPost = async (req, res) => {
    const { post_id, tag_id } = req.body;

    if (!post_id || !tag_id) {
        return res.status(400).json('Post ID and Tag ID are required');
    }

    try {
        const postTag = await PostTag.findOneAndDelete({ post_id, tag_id });
        if (!postTag) {
            return res.status(404).json('Tag association not found');
        }
        res.json('Tag removed from post');
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};


const getTagsForPost = async (req, res) => {
    const { post_id } = req.params;

    try {
        const postTags = await PostTag.find({ post_id }).populate('tag_id', 'tag_name');
        res.json(postTags);
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};


const getPostsForTag = async (req, res) => {
    const { tag_id } = req.params;

    try {
        const postTags = await PostTag.find({ tag_id }).populate('post_id', 'title');
        res.json(postTags);
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};

export default { addTagToPost, removeTagFromPost, getTagsForPost, getPostsForTag };
