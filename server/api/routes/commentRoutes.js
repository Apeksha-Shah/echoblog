import express from 'express';
import commentController from '../../controllers/commentController.js';

const { createComment, getCommentsForPost, updateComment, deleteComment } = commentController;
const commentRoutes = express.Router();

commentRoutes.post('/', createComment); 
commentRoutes.get('/post/:post_id', getCommentsForPost); 
commentRoutes.put('/:id', updateComment); 
commentRoutes.delete('/:id', deleteComment); 

export default commentRoutes;
