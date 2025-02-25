import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import apiClient from '../axiosClient';

const BlogCard = ({ blog, onFetchPosts, className, isEditing, onDeleteBlog }) => {

  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const displayBlog = async () => {
    setIsClicked(true);
    try{
      const response = await apiClient.get(`/api/posts/blog/${blog._id}`);
      onFetchPosts(response.data, blog._id);
    }catch(err){
      console.log(err);
    }
  }

  const handleDelete = async () => {
    try{
      await apiClient.delete(`/api/blogs/${blog._id}`);
      onDeleteBlog(blog._id);
    }catch(err){
      console.log(err);
    }
  }

  const handleViewAuthor = () => {
    console.log(blog);
     navigate(`/author/${blog.author_id._id}`);
  }

  return (
    <div className={`${className} transform transition-transform duration-300 hover:scale-105`}>
      <h3 className="text-xl font-semibold mb-3 text-indigo-400">{blog.title}</h3>
      <p className="text-gray-300 mb-3">{blog.content}</p>
      <div className="text-sm text-gray-400 mb-2">
        Published by: {blog.author} on {new Date(blog.created_at).toLocaleDateString()}
      </div>
      <button className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md" onClick={displayBlog}>
        Read More
      </button>
      {isEditing && (
        <button className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-md ml-2"
                onClick={() => handleDelete()}>
          <FontAwesomeIcon icon={faTrash}/> 
        </button>
      )}
      {!isEditing && (
        <button className = "bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md ml-2"
                onClick={() => handleViewAuthor()}>
          View Author
        </button>
      )
      }
    </div>
  );
};

export default BlogCard;
