import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const [posts, setPosts] = useState([]);
  const [blogs, setBlogs] = useState([]); // State to hold blogs for the dropdown
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/blog/${id}`);
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs'); // Fetch all blogs for the dropdown
        setBlogs(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
    fetchBlogs();
  }, [id]);

  const handleBlogChange = (event) => {
    navigate(`/blog/${event.target.value}`);
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 px-4 flex flex-col">
        <div className="flex flex-col md:flex-row justify-center items-center mb-4">
          <div className="w-full md:w-1/4 pr-2 mb-4 md:mb-0">
            <select 
              onChange={handleBlogChange} 
              className="bg-gray-700 text-white rounded-md p-2 w-full"
            >
              <option value="" disabled selected>Select a Blog</option>
              {blogs.map((blogItem) => (
                <option key={blogItem._id} value={blogItem._id}>
                  {blogItem.title}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/4 pl-2">
            <button
              onClick={() => navigate('/create-post', { state: { blogId: id } })}
              className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md w-full"
            >
              Create Post
            </button>
          </div>
        </div>

        <div className="w-full p-4 overflow-x-hidden">
          <h2 className="text-3xl font-bold text-gray-200 text-center mb-4">Posts</h2>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {posts.map((post) => (
                <div 
                  key={post._id} 
                  className="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-3 mx-7"
                  style={{ fontSize: '0.98rem' }} 
                >
                  <h3 className="text-xl font-semibold mb-3 text-indigo-400">{post.title}</h3>
                  <p className="text-gray-300 mb-3">{post.content.substring(0, 150)}...</p>
                  <div className="text-sm text-gray-400 mb-2">
                    Published on: {new Date(post.created_at || post.publishDate).toLocaleDateString()}
                  </div>
                  {/* Center the tags */}
                  <div className="flex justify-center flex-wrap gap-2 mb-4">
                    {post.tags?.map((tag, index) => (
                      <span key={index} className="bg-indigo-700 text-white px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {post.file ? (
                    post.file.endsWith('.jpg') || post.file.endsWith('.png') || post.file.endsWith('.jpeg') ? (
                      <div className="flex justify-center mb-3"> {/* Center the image */}
                        <img
                          src={`http://localhost:5000/uploads/${post.file}`}
                          alt="Post Image"
                          className="w-1/3 h-auto rounded-lg shadow-md" // Adjusted size here
                        />
                      </div>
                    ) : (
                      <a href={`http://localhost:5000/uploads/${post.file}`} target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">
                        View File
                      </a>
                    )
                  ) : (
                    <p className="text-red-500">No file available</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-300">No posts available for this blog.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
