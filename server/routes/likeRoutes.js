import express from 'express';
import likeController from '../controllers/likeController.js';

const { addLike, removeLike, getLikesForPost, getLikesByUser, getNumLikes } = likeController;
const likeRoutes = express.Router();

likeRoutes.post('/', addLike); 
likeRoutes.delete('/', removeLike); 
likeRoutes.get('/post/:post_id', getLikesForPost);
likeRoutes.get('/user/:user_id', getLikesByUser); 
likeRoutes.get('/num-likes', getNumLikes);

export default likeRoutes;
