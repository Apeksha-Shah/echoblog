import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    minlength: [3, 'Category name must be at least 3 characters long'],
    maxlength: [100, 'Category name cannot exceed 100 characters']
  }
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
