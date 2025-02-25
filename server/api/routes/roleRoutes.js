import express from "express";
import roleController from "../../controllers/roleController.js";
const {getAllRoles,createRole} = roleController;

const roleRoutes = express.Router();

roleRoutes.get("/", getAllRoles);
roleRoutes.post("/",createRole);


export default roleRoutes;
