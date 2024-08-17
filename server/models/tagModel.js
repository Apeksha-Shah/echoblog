import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  tag_name: {
    type: String,
    required: [true, 'Tag name is required'],
    unique: true,
    minlength: [1, 'Tag name must be at least 1 character long'],
    maxlength: [50, 'Tag name cannot exceed 50 characters']
  }
});

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;
