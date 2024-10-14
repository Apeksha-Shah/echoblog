import mongoose, { Mongoose } from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [1, 'Title must be at least 1 character long'],
    maxlength: [255, 'Title cannot exceed 255 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author ID is required']
  },
  blog_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: [true, 'Blog ID is required']
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  category_ids: [{
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'Category' 
  }], 
  tags: {
    type: mongoose.Schema.Types.Array,
    validate: {
      validator: function (v) {
        return v.length <= 10;
      },
      message: 'Tags cannot exceed 10'
    }
  },
  files: { 
    type: [String],
  }
});

const Post = mongoose.model('Post', postSchema);

export default Post;
