import Post from '../models/postModel.js'; 
import User from '../models/userModel.js'; 
import Category from '../models/categoryModel.js';


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

const getAllPostsOfBlog = async (req, res) => {
    try {
        const posts = await Post.find({blog_id: req.params.id}).populate('author_id'); 
        res.json(posts);
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
}

const createPost = async (req, res) => {

    const { title, content, category, tags, publishDate, author_id, blogId } = req.body;

    if (!title || !content || !category || !tags || !publishDate || !author_id || !blogId) {
        return res.status(400).json('All fields are required');
    }

    const files = req.files;

    try {
        const author = await User.findById(author_id);
        if (!author) {
            return res.status(400).json('Invalid author ID');
        }

        const c1 = await Category.findOne({category_name: category});
        if (!c1) {
                return res.status(400).json(`Invalid category : ${category}`);
        }

        const filenames = files.map(file => file.filename);

        const newPost = new Post({
            title,
            content,
            author_id,
            publishDate,
            tags,
            category_ids: c1._id,
            blog_id: blogId,
            files: filenames
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

        const files = req.files || [];
        const filenames = files.map(file => file.filename);
        post.files = [...post.files, ...filenames]; 

        const { title, content, category, tags, publishDate, author_id } = req.body;

        if (title) post.title = title;
        if (content) post.content = content;
        if (author_id) {
            post.author_id = author_id;
        }
        if (category) {
            const c1 = await Category.findOne({ category_name: category });
            if (!c1) {
                return res.status(400).json(`Invalid category: ${category}`);
            }
            post.category_ids = c1._id;
        }
        if (tags) post.tags = tags.split(',').map(tag => tag.trim());
        if (publishDate) post.publishDate = publishDate;
        post.updated_at = Date.now(); 

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

export default { getAllPosts, getSpecificPost, createPost, updatePost, deletePost, getAllPostsOfBlog };
