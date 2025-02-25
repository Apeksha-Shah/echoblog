import express from 'express';
import permissionController from '../../controllers/permissionController.js';

const { createPermission, getAllPermissions, getPermissionById, updatePermission, deletePermission } = permissionController;
const permissionRoutes = express.Router();

permissionRoutes.post('/', createPermission); 
permissionRoutes.get('/', getAllPermissions); 
permissionRoutes.get('/:id', getPermissionById); 
permissionRoutes.put('/:id', updatePermission);
permissionRoutes.delete('/:id', deletePermission);

export default permissionRoutes;
