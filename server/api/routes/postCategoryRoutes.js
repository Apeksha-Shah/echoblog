import express from 'express';
import postCategoryController from '../../controllers/postCategoryController.js';

const { addCategoryToPost, removeCategoryFromPost, getCategoriesForPost, getPostsForCategory } = postCategoryController;
const postCategoryRoutes = express.Router();

postCategoryRoutes.post('/', addCategoryToPost); 
postCategoryRoutes.delete('/', removeCategoryFromPost); 
postCategoryRoutes.get('/post/:post_id', getCategoriesForPost); 
postCategoryRoutes.get('/category/:category_id', getPostsForCategory); 

export default postCategoryRoutes;
