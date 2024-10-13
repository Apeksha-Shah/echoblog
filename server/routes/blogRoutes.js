import express from "express";
import blogController from "../controllers/blogController.js";
const {getAllBlogs,getSpecificBlog,createBlog,deleteBlog} = blogController;


const blogRoutes = express.Router();

blogRoutes.get("/:id",getSpecificBlog);
blogRoutes.get("/", getAllBlogs);
blogRoutes.post("/",createBlog);
blogRoutes.delete("/:id",deleteBlog);

export default blogRoutes;
