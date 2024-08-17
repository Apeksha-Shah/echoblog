import PostCategory from '../models/postCategoryModel.js';


const addCategoryToPost = async (req, res) => {
    const { post_id, category_id } = req.body;

    if (!post_id || !category_id) {
        return res.status(400).json('Post ID and Category ID are required');
    }

    try {
        const newPostCategory = new PostCategory({ post_id, category_id });
        await newPostCategory.save();
        res.status(201).json('Category added to post');
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};

const removeCategoryFromPost = async (req, res) => {
    const { post_id, category_id } = req.body;

    if (!post_id || !category_id) {
        return res.status(400).json('Post ID and Category ID are required');
    }

    try {
        const postCategory = await PostCategory.findOneAndDelete({ post_id, category_id });
        if (!postCategory) {
            return res.status(404).json('Category association not found');
        }
        res.json('Category removed from post');
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};


const getCategoriesForPost = async (req, res) => {
    const { post_id } = req.params;

    try {
        const postCategories = await PostCategory.find({ post_id }).populate('category_id', 'category_name');
        res.json(postCategories);
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};


const getPostsForCategory = async (req, res) => {
    const { category_id } = req.params;

    try {
        const postCategories = await PostCategory.find({ category_id }).populate('post_id', 'title');
        res.json(postCategories);
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};

export default { addCategoryToPost, removeCategoryFromPost, getCategoriesForPost, getPostsForCategory };
