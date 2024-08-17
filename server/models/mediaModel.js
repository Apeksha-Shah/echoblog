import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'Post ID is required']
  },
  file_path: {
    type: String,
    required: [true, 'File path is required']
  },
  uploaded_at: {
    type: Date,
    default: Date.now
  }
});

const Media = mongoose.model('Media', mediaSchema);

export default Media;
