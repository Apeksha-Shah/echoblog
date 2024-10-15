import express from "express";
import userController from "../controllers/userController.js";
import authenticate from "../middleware/authenticate.js";
import multer from "multer";
import storage from "../utils/fileUtils.js";

const {getAllUsers,getSpecificUser,createUser,updateUser,deleteUser,login,verifyOtp} = userController;

const upload = multer({storage: storage}).single('profileImage');

const userRoutes = express.Router();

userRoutes.get("/", authenticate,getAllUsers);
userRoutes.get("/:id",authenticate,getSpecificUser);
userRoutes.post("/",createUser);

userRoutes.put("/:id",authenticate,upload,(req,res,next)=>{
    console.log("PUT / route hit.");
    // console.log(req.body);
    next();
},updateUser);

userRoutes.delete("/:id",authenticate,deleteUser);
userRoutes.post("/login",login);
userRoutes.post("/verifyotp",verifyOtp);

export default userRoutes;
