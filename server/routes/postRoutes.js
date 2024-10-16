import express from "express";
import postController from "../controllers/postController.js";
import multer from "multer";
import storage from "../utils/fileUtils.js";
const {getAllPosts,getSpecificPost,createPost,updatePost,deletePost, getAllPostsOfBlog} = postController;

const postRoutes = express.Router();

const upload = multer({storage: storage}).array('files');

postRoutes.get("/", getAllPosts);
postRoutes.get("/:id",getSpecificPost);

postRoutes.post("/",upload, (req, res, next) => {
    console.log("POST / route hit.");
    // console.log(req.body); 
    // console.log(req.files);
    next();  
}, createPost);

postRoutes.put("/:id",upload , (req,res,next)=>{
    // console.log("PUT / route hit.");
    // console.log(req.body);
    next();
},updatePost);

postRoutes.delete("/:id",deletePost);
postRoutes.get("/blog/:id", getAllPostsOfBlog);

export default postRoutes;
