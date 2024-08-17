import View from '../models/viewModel.js';

const recordView = async (req, res) => {
    const { post_id, user_id } = req.body;

    if (!post_id || !user_id) {
        return res.status(400).json('Post ID and User ID are required');
    }

    try {
        const newView = new View({ post_id, user_id });
        await newView.save();
        res.status(201).json('View recorded');
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};

const getPostViews = async (req, res) => {
    const { post_id } = req.params;

    try {
        const views = await View.find({ post_id }).populate('user_id', 'username');
        res.json(views);
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};

const getUserViews = async (req, res) => {
    const { user_id } = req.params;

    try {
        const views = await View.find({ user_id }).populate('post_id', 'title');
        res.json(views);
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};

export default { recordView, getPostViews, getUserViews };
