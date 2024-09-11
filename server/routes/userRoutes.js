import express from "express";
import userController from "../controllers/userController.js";
import authenticate from "../middleware/authenticate.js";

const {getAllUsers,getSpecificUser,createUser,updateUser,deleteUser,login} = userController;

const userRoutes = express.Router();

userRoutes.get("/", authenticate,getAllUsers);
userRoutes.get("/:id",authenticate,getSpecificUser);
userRoutes.post("/",createUser);
userRoutes.put("/:id",authenticate,updateUser);
userRoutes.delete("/:id",authenticate,deleteUser);
userRoutes.post("/login",login);

export default userRoutes;
