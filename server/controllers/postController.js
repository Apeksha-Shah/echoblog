import Post from '../models/postModel.js'; 
import User from '../models/userModel.js'; 

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author_id', 'username email'); 
        res.json(posts);
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
};

const getSpecificPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author_id', 'username email');
        // .populate() is used to replace ObjectIDs with the full documents from the referenced collection.
        if (!post) {
            return res.status(404).json('Post not found');
        }
        res.json(post);
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
};

const createPost = async (req, res) => {
    const { title, content, author_id } = req.body;

    if (!title || !content || !author_id) {
        return res.status(400).json('All fields are required');
    }

    try {
        const author = await User.findById(author_id);
        if (!author) {
            return res.status(400).json('Invalid author ID');
        }

        const newPost = new Post({
            title,
            content,
            author_id
        });

        await newPost.save();
        res.status(201).json('Post created');
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};

const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json('Post not found');
        }

        const { title, content, author_id } = req.body;
        if (title) post.title = title;
        if (content) post.content = content;
        if (author_id) {
            const author = await User.findById(author_id);
            if (!author) {
                return res.status(400).json('Invalid author ID');
            }
            post.author_id = author_id;
        }

        post.updated_at = Date.now(); // Update the timestamp

        await post.save();
        res.status(200).json('Post updated');
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json('Post not found');
        }
        res.json('Post deleted');
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
};

export default { getAllPosts, getSpecificPost, createPost, updatePost, deletePost };
