import Permission from '../models/permissionModel.js';


const createPermission = async (req, res) => {
    const { role_id, permission_name } = req.body;

    if (!role_id || !permission_name) {
        return res.status(400).json('Role ID and permission name are required');
    }

    try {
        const newPermission = new Permission({ role_id, permission_name });
        await newPermission.save();
        res.status(201).json('Permission added');
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};


const getAllPermissions = async (req, res) => {
    try {
        const permissions = await Permission.find().populate('role_id', 'role_name');
        res.json(permissions);
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};


const getPermissionById = async (req, res) => {
    const { id } = req.params;

    try {
        const permission = await Permission.findById(id).populate('role_id', 'role_name');
        if (!permission) {
            return res.status(404).json('Permission not found');
        }
        res.json(permission);
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};


const updatePermission = async (req, res) => {
    const { id } = req.params;
    const { role_id, permission_name } = req.body;

    try {
        const permission = await Permission.findById(id);
        if (!permission) {
            return res.status(404).json('Permission not found');
        }

        if (role_id) {
            permission.role_id = role_id;
        }
        if (permission_name) {
            permission.permission_name = permission_name;
        }

        await permission.save();
        res.json('Permission updated');
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};


const deletePermission = async (req, res) => {
    const { id } = req.params;

    try {
        const permission = await Permission.findByIdAndDelete(id);
        if (!permission) {
            return res.status(404).json('Permission not found');
        }
        res.json('Permission deleted');
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};

export default { createPermission, getAllPermissions, getPermissionById, updatePermission, deletePermission };
