import express from 'express';
import tagController from '../controllers/tagController.js';

const { getAllTags, getSpecificTag, createTag, updateTag, deleteTag } = tagController;
const tagRoutes = express.Router();

tagRoutes.get('/', getAllTags);
tagRoutes.get('/:id', getSpecificTag);
tagRoutes.post('/', createTag);
tagRoutes.put('/:id', updateTag);
tagRoutes.delete('/:id', deleteTag);

export default tagRoutes;
