import express from "express";
import userController from "../controllers/userController.js";
const {getAllUsers,getSpecificUser,createUser,updateUser,deleteUser} = userController;


const userRoutes = express.Router();

userRoutes.get("/", getAllUsers);
userRoutes.get("/:id",getSpecificUser);
userRoutes.post("/",createUser);
userRoutes.put("/:id",updateUser);
userRoutes.delete("/:id",deleteUser);

export default userRoutes;
