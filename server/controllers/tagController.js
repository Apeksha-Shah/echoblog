import Tag from '../models/tagModel.js';

const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.json(tags);
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
};

const getSpecificTag = async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.id);
        if (!tag) {
            return res.status(404).json('Tag not found');
        }
        res.json(tag);
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
};

const createTag = async (req, res) => {
    const { tag_name } = req.body;

    if (!tag_name) {
        return res.status(400).json('Tag name is required');
    }

    try {
        const newTag = new Tag({ tag_name });
        await newTag.save();
        res.status(201).json('Tag added');
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};

const updateTag = async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.id);
        if (!tag) {
            return res.status(404).json('Tag not found');
        }

        const { tag_name } = req.body;
        if (tag_name) {
            tag.tag_name = tag_name;
        }

        await tag.save();
        res.status(200).json('Tag updated');
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
};

const deleteTag = async (req, res) => {
    try {
        const tag = await Tag.findByIdAndDelete(req.params.id);
        if (!tag) {
            return res.status(404).json('Tag not found');
        }
        res.json('Tag deleted');
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
};

export default { getAllTags, getSpecificTag, createTag, updateTag, deleteTag };
