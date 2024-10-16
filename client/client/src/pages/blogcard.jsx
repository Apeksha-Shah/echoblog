import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const BlogCard = ({ blog, onFetchPosts, className, isEditing, onDeleteBlog }) => {

  const [isClicked, setIsClicked] = useState(false);

  const displayBlog = async () => {
    setIsClicked(true);
    try{
      const response = await axios.get(`http://localhost:5000/api/posts/blog/${blog._id}`);
      onFetchPosts(response.data, blog._id);
    }catch(err){
      console.log(err);
    }
  }

  const handleDelete = async () => {
    try{
      await axios.delete(`http://localhost:5000/api/blogs/${blog._id}`);
      onDeleteBlog(blog._id);
    }catch(err){
      console.log(err);
    }
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
    </div>
  );
};

export default BlogCard;
