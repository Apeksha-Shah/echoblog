import mongoose from 'mongoose';

const postCategorySchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'Post ID is required']
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category ID is required']
  }
});

const PostCategory = mongoose.model('PostCategory', postCategorySchema);

export default PostCategory;
