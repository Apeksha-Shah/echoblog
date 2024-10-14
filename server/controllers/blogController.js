import Blog from '../models/blogModel.js'; 
import User from '../models/userModel.js'; 

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author_id'); 
        // console.log("get all blogs");

        res.json(blogs);
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
};

const getSpecificBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author_id');
        // console.log("get specific blog");
        // .populate() is used to replace ObjectIDs with the full documents from the referenced collection.
        if (!blog) {
            return res.status(404).json('Post not found');
        }
        res.json(blog);
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
};

const getBlogByAuthor = async (req, res)=> {
    try{
        console.log(req.params.id);
        const blogs = await Blog.find({author_id: req.params.id}).populate('author_id');
        if(blogs.length === 0){
            return res.status(404).json('No blogs found');
        }
        return res.json(blogs);
    }catch(err){
        res.status(400).json('Error:'+err.message);
    }

}

const createBlog = async (req, res) => {
    const { title, author_id } = req.body;
    // console.log("outside try block");
    // console.log(title, content, category, tags, publishDate, file, author_id);


    if (!title || !author_id) {
        return res.status(400).json('All fields are required');
    }

    try {
        const author = await User.findById(author_id);
        if (!author) {
            return res.status(400).json('Invalid author ID');
        }

        // console.log("inside try block");
        const newBlog = new Blog({
            title,
            author_id,
        });

        await newBlog.save();
        res.status(201).json('Blog created');
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};


const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json('Post not found');
        }
        res.json('Blog deleted');
    } catch (err) {
        res.status(400).json('Error: ' + err.message);
    }
};

export default { getAllBlogs, getSpecificBlog, createBlog, deleteBlog, getBlogByAuthor };
