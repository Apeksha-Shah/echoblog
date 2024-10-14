import express from "express";
import blogController from "../controllers/blogController.js";
const {getAllBlogs,getSpecificBlog,createBlog,deleteBlog, getBlogByAuthor} = blogController;


const blogRoutes = express.Router();

blogRoutes.get("/:id",getSpecificBlog);
blogRoutes.get("/", getAllBlogs);
blogRoutes.post("/",createBlog);
blogRoutes.delete("/:id",deleteBlog);
blogRoutes.get("/author/:id",getBlogByAuthor);

export default blogRoutes;
