import express from 'express';
import postTagController from '../controllers/postTagController.js';

const { addTagToPost, removeTagFromPost, getTagsForPost, getPostsForTag } = postTagController;
const postTagRoutes = express.Router();

postTagRoutes.post('/', addTagToPost); 
postTagRoutes.delete('/', removeTagFromPost); 
postTagRoutes.get('/post/:post_id', getTagsForPost);
postTagRoutes.get('/tag/:tag_id', getPostsForTag); 

export default postTagRoutes;
