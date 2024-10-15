import Like from '../models/likeModel.js';


const addLike = async (req, res) => {
    console.log(req.body);
    const { post_id, user_id } = req.body;

    if (!post_id || !user_id) {
        return res.status(400).json('Post ID and User ID are required');
    }

    try {
      
        const existingLike = await Like.findOne({ post_id, user_id });
        if (existingLike) {
            return res.status(400).json('User has already liked this post');
        }

        const newLike = new Like({ post_id, user_id });
        await newLike.save();
        res.status(201).json('Like added');
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};


const removeLike = async (req, res) => {
    const { post_id, user_id } = req.query;

    if (!post_id || !user_id) {
        return res.status(400).json('Post ID and User ID are required');
    }

    try {
        const like = await Like.findOneAndDelete({ post_id, user_id });
        if (!like) {
            return res.status(404).json('Like not found');
        }
        res.json('Like removed');
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};


const getLikesForPost = async (req, res) => {
    const { post_id } = req.params;

    try {
        const likes = await Like.find(post_id).populate('user_id', 'username'); 
        res.json(likes);
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};


const getLikesByUser = async (req, res) => {
    const { author_id } = req.params;

    try {
        const likes = await Like.find( author_id );
        const postIds = likes.map(like => like.post_id);
        res.json(postIds);
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};

export default { addLike, removeLike, getLikesForPost, getLikesByUser };
