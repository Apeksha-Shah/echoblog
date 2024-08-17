import Media from '../models/mediaModel.js';


const createMedia = async (req, res) => {
    const { post_id, file_path } = req.body;

    if (!post_id || !file_path) {
        return res.status(400).json('Post ID and file path are required');
    }

    try {
        const newMedia = new Media({ post_id, file_path });
        await newMedia.save();
        res.status(201).json('Media added');
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};


const getMediaForPost = async (req, res) => {
    const { post_id } = req.params;

    try {
        const media = await Media.find({ post_id });
        res.json(media);
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};


const updateMedia = async (req, res) => {
    const { id } = req.params;
    const { file_path } = req.body;

    try {
        const media = await Media.findByIdAndUpdate(id, { file_path }, { new: true });
        if (!media) {
            return res.status(404).json('Media not found');
        }
        res.json('Media updated');
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};


const deleteMedia = async (req, res) => {
    const { id } = req.params;

    try {
        const media = await Media.findByIdAndDelete(id);
        if (!media) {
            return res.status(404).json('Media not found');
        }
        res.json('Media deleted');
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};

export default { createMedia, getMediaForPost, updateMedia, deleteMedia };
