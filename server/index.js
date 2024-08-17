import dotenv from 'dotenv';
dotenv.config(); 
import express from 'express';
import connectDB from './config/db.js'; 

// import userRoutes from './routes/userRoutes.js';
// import postRoutes from './routes/postRoutes.js';

const app = express();
connectDB();

const PORT = process.env.PORT || 5000;


// app.use('/api/users', userRoutes);
// app.use('/api/posts', postRoutes);

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});
  

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
