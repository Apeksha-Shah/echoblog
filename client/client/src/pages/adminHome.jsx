import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import { useNavigate } from 'react-router-dom';
import apiClient from '../axiosClient';

const AdminHome = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    const isAdmin = true;
    const [isDeleted, setIsDeleted] = useState(false);

    
    const handleFetchedPost = (posts, blogId) => {
        navigate(`/blog/${blogId}`, { state: { blogId, posts, blogs, isAdmin } });
    };

    
    const handleDeleteBlog = (blogId) => {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
        setIsDeleted(true);
    };

    
    const fetchBlogs = async () => {
        try {
            const response = await apiClient.get(`/api/blogs`);
            console.log(response.data);
            setBlogs(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [isDeleted]); 

    return (
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white min-h-screen p-10">
            <div className="grid grid-cols-1 gap-4 ml-16 mr-16 mt-10">
                {blogs.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {blogs.map((blog) => (
                            <div key={blog._id} className="border border-gray-600 rounded-lg bg-gray-800 shadow-md p-4 transition duration-200 hover:shadow-lg cursor-pointer">
                                <BlogCard
                                    blog={blog}
                                    onFetchPosts={handleFetchedPost}
                                    onDeleteBlog={handleDeleteBlog}
                                    isEditing={true}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-300">No blogs available.</p>
                )}
            </div>
        </div>
    );
};

export default AdminHome;
