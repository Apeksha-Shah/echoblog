import mongoose from 'mongoose';

const connectDB = async () => {

    const MONGO_URL = process.env.MONGO_URL;

    try {
        if (!MONGO_URL) {
            throw new Error('MONGO_URL is not defined in environment variables');
        }

        await mongoose.connect(MONGO_URL);

        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
