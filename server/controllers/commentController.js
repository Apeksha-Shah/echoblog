import Comment from '../models/commentModel.js';


const createComment = async (req, res) => {
    const { post_id, user_id, content } = req.body;

    if (!post_id || !user_id || !content) {
        return res.status(400).json('Post ID, User ID, and content are required');
    }

    try {
        const newComment = new Comment({ post_id, user_id, content });
        await newComment.save();
        res.status(201).json('Comment created');
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};


const getCommentsForPost = async (req, res) => {
    const { post_id } = req.params;

    try {
        const comments = await Comment.find({ post_id }).populate('user_id', 'username');
        res.json(comments);
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};


const updateComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
        const comment = await Comment.findByIdAndUpdate(id, { content }, { new: true });
        if (!comment) {
            return res.status(404).json('Comment not found');
        }
        res.json('Comment updated');
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};


const deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) {
            return res.status(404).json('Comment not found');
        }
        res.json('Comment deleted');
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};

export default { createComment, getCommentsForPost, updateComment, deleteComment };
