import express from "express";
import postController from "../controllers/postController.js";
const {getAllPosts,getSpecificPost,createPost,updatePost,deletePost} = postController;


const postRoutes = express.Router();

postRoutes.get("/", getAllPosts);
postRoutes.get("/:id",getSpecificPost);
postRoutes.post("/",createPost);
postRoutes.put("/:id",updatePost);
postRoutes.delete("/:id",deletePost);

export default postRoutes;
