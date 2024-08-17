import Category from '../models/categoryModel.js';

const createCategory = async (req, res) => {
    const { category_name } = req.body;

    if (!category_name) {
        return res.status(400).json('Category name is required');
    }

    try {
        const newCategory = new Category({ category_name });
        await newCategory.save();
        res.status(201).json('Category created');
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};


const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};


const getCategoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json('Category not found');
        }
        res.json(category);
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};


const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { category_name } = req.body;

    try {
        const category = await Category.findByIdAndUpdate(id, { category_name }, { new: true });
        if (!category) {
            return res.status(404).json('Category not found');
        }
        res.json('Category updated');
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};


const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json('Category not found');
        }
        res.json('Category deleted');
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};

export default { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory };
