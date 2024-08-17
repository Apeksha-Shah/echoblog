import dotenv from 'dotenv';
dotenv.config(); 
import express from 'express';
import connectDB from './config/db.js'; 
import userRoutes from './routes/userRoutes.js';
import bodyParser from 'body-parser';
import roleRoutes from './routes/roleRoutes.js';
import postRoutes from './routes/postRoutes.js';
import tagRoutes from './routes/tagRoutes.js';
import viewRoutes from './routes/viewRoutes.js';
import likeRoutes from './routes/likeRoutes.js';
import postTagRoutes from './routes/postTagRoutes.js';
import postCategoryRoutes from './routes/postCategoryRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import permissionRoutes from './routes/permissionRoutes.js';

const app = express();
connectDB();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/role',roleRoutes);
app.use('/api/tags', tagRoutes); 
app.use('/api/views', viewRoutes); 
app.use('/api/likes', likeRoutes); 
app.use('/api/post-tags', postTagRoutes);
app.use('/api/post-categories', postCategoryRoutes); 
app.use('/api/categories', categoryRoutes);
app.use('/api/comments', commentRoutes); 
app.use('/api/media', mediaRoutes); 
app.use('/api/permissions', permissionRoutes);

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});
  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
