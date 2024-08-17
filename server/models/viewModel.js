import mongoose from 'mongoose';

const viewSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'Post ID is required']
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  viewed_at: {
    type: Date,
    default: Date.now
  }
});

const View = mongoose.model('View', viewSchema);

export default View;
