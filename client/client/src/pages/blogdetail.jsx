import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Blogdetail = () => {
  const [blog, setBlog] = useState({});
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setBlog(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/blog/${id}`);
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlog();
    fetchPosts();
  }, [id]);

  return (
    <>
      <Header />
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-10 px-5">
        <div className="max-w-3xl mx-auto bg-white text-gray-900 rounded-lg shadow-lg p-10">
          <h1 className="text-4xl font-bold mb-5 text-center text-indigo-600">{blog.title || 'Blog Title'}</h1>
          
          <div className="text-center">
            <button
              onClick={() => navigate('/create-post', { state: { blogId: id } })}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105"
            >
              Create Post
            </button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-10">
          <h2 className="text-3xl font-bold text-center text-white mb-5">Posts</h2>
          {posts.length > 0 ? (
            <div className="space-y-5">
              {posts.map((post) => (
                <div key={post._id} className="bg-white text-gray-900 p-5 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-3 text-indigo-600">{post.title}</h3>
                  <p className="text-gray-700 mb-3">{post.content.substring(0, 150)}...</p>

                  <div className="text-sm text-gray-500 mb-2">
                    Published on: {new Date(post.created_at || post.publishDate).toLocaleDateString()}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {post.tags?.map((tag, index) => (
                      <span key={index} className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {post.file ? (
                    post.file.endsWith('.jpg') || post.file.endsWith('.png') || post.file.endsWith('.jpeg') ? (
                      (() => {
                        const imageUrl = `http://localhost:5000/uploads/${post.file}`;
                        return (
                          <img
                            src={imageUrl}
                            alt="image1"
                            className="w-full h-auto rounded-lg shadow-md"
                          />
                        );
                      })()
                    ) : (
                      <a href={`http://localhost:5000/uploads/${post.file}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">
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
            <p className="text-center text-white">No posts available for this blog.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Blogdetail;
