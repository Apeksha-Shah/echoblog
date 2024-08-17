import express from 'express';
import mediaController from '../controllers/mediaController.js';

const { createMedia, getMediaForPost, updateMedia, deleteMedia } = mediaController;
const mediaRoutes = express.Router();

mediaRoutes.post('/', createMedia); 
mediaRoutes.get('/post/:post_id', getMediaForPost); 
mediaRoutes.put('/:id', updateMedia); 
mediaRoutes.delete('/:id', deleteMedia);

export default mediaRoutes;
