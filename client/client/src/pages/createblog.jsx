import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import BlogCard from './BlogCard';

const CreateBlog = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [blogs, setBlogs] = useState([]);
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const author_id = decodedToken.id;
  const [isdeleted, setisdeleted] = useState(false);
  const [isCreated, setisCreated] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const [title, setTitle] = useState('');

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/blogs/', {
        title,
        author_id
      });

      resetFields();
      setisCreated(true);
      navigate('/create-blog');

    } catch (err) {
      console.log(err);
    }
  };

  const handleFetchedPost = (posts, blogId) => {
    navigate(`/blog/${blogId}`, { state: { blogId, posts, blogs}});
  };
  

  const handleDeleteBlog = (blogId) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
    setisdeleted(true);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      setisCreated(false);
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/author/${author_id}`);
        if (response.data) {
          setBlogs(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBlogs();
  }, [author_id,isdeleted,isCreated]);

  const resetFields = () => {
    setTitle('');
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white min-h-screen">
      <Header />
      <div className="flex flex-col p-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter blog title"
            className="text-2xl mb-5 p-3 rounded bg-gray-700 text-white focus:outline-none" // Updated styles
            required
          />

          <div className="flex justify-center space-x-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create
            </button>
          </div>
        </form>
        {
          blogs.length > 0 ? (
            <div className="flex justify-center">
              <div className="grid grid-cols-1 gap-6 w-1/2 mt-10"> {/* Ensuring one column */}
                {
                  blogs.map(blog => 
                    <div key={blog._id} className="border border-gray-600 rounded-lg">
                      <BlogCard
                        blog={blog}
                        onFetchPosts={handleFetchedPost}
                        onDeleteBlog={handleDeleteBlog} 
                        className="bg-gray-800 text-white shadow-md rounded-lg p-4 transition duration-200 hover:shadow-lg cursor-pointer"
                        isEditing={true}
                      />
                    </div>
                  )
                }
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-300">No blogs available.</p>
          )
        }
      </div>
    </div>
  );
};

export default CreateBlog;
