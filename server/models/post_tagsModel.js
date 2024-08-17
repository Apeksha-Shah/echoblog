import mongoose from 'mongoose';

const postTagSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'Post ID is required']
  },
  tag_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
    required: [true, 'Tag ID is required']
  }
});

const PostTag = mongoose.model('PostTag', postTagSchema);

export default PostTag;
