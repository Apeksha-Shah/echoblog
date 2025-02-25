import express from 'express';
import categoryController from '../../controllers/categoryController.js';

const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = categoryController;
const categoryRoutes = express.Router();

categoryRoutes.post('/', createCategory);
categoryRoutes.get('/', getAllCategories);
categoryRoutes.get('/:id', getCategoryById);
categoryRoutes.put('/:id', updateCategory);
categoryRoutes.delete('/:id', deleteCategory);

export default categoryRoutes;
