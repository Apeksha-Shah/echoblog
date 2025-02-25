import express from 'express';
import viewController from '../../controllers/viewController.js';

const { recordView, getPostViews, getUserViews } = viewController;
const viewRoutes = express.Router();

viewRoutes.post('/', recordView); 
viewRoutes.get('/post/:post_id', getPostViews); 
viewRoutes.get('/user/:user_id', getUserViews); 

export default viewRoutes;
