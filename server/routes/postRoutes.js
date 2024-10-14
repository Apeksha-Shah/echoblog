import express from "express";
import postController from "../controllers/postController.js";
import multer from "multer";
import fs from "fs";
import path from "path";
const {getAllPosts,getSpecificPost,createPost,updatePost,deletePost, getAllPostsOfBlog} = postController;


const postRoutes = express.Router();

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// destination --> where you want to store file 
// filename --> how you want to store file
// cb --> callback function 
const storage = multer.diskStorage({
        destination: function (req, file, cb){
            // will create folder named uploads in root directory
            // first argument is error, second argument is path
            console.log("Setting storage destination.");
            cb(null, './uploads');
        },
        filename: function (req, file, cb){
            // first argument is error, second argument is name of the file with timestamp for avoiding duplication
            const ext = path.extname(file.originalname); // file extension
            const baseName = path.basename(file.originalname, ext); // file name without extension
            console.log("Setting filename.");
            cb(null, `${baseName}-${Date.now()}${ext}`); 
        }
})

const upload = multer({storage: storage}).array('files');

postRoutes.get("/", getAllPosts);
postRoutes.get("/:id",getSpecificPost);

postRoutes.post("/",upload, (req, res, next) => {
    console.log("POST / route hit.");
    console.log(req.body); 
    console.log(req.files);
    next();  
}, createPost);

postRoutes.put("/:id",updatePost);
postRoutes.delete("/:id",deletePost);
postRoutes.get("/blog/:id", getAllPostsOfBlog);

export default postRoutes;
