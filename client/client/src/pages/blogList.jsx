import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';
import Header from './Header';
import { IconButton } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import '../assets/scroll.css'; 

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(false); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [sidebarOpen, setSidebarOpen] = useState(true); 
  const [currentImageIndexes, setCurrentImageIndexes] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlogs();
  }, []);

  const handleFetchedPost = (posts) => {
    setPosts(posts);
    setSelectedBlog(true); 
    setCurrentImageIndexes(Array(posts.length).fill(0)); // Initialize image indexes for the new posts
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNextImage = (postIndex) => {
    setCurrentImageIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      if (posts[postIndex].files && posts[postIndex].files.length > 0) {
        newIndexes[postIndex] = (newIndexes[postIndex] + 1) % posts[postIndex].files.length;
      }
      return newIndexes;
    });
  };

  const handlePrevImage = (postIndex) => {
    setCurrentImageIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes];
      if (posts[postIndex].files && posts[postIndex].files.length > 0) {
        newIndexes[postIndex] = (newIndexes[postIndex] - 1 + posts[postIndex].files.length) % posts[postIndex].files.length;
      }
      return newIndexes;
    });
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 px-4 flex h-screen relative overflow-hidden">
        
        <div className={`absolute top-4 left-4 z-10`}>
          <IconButton onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
            {sidebarOpen ? <CloseIcon style={{ color: 'white' }} /> : <MenuIcon style={{ color: 'white' }} />}
          </IconButton>
        </div>

        <div className={`transition-transform duration-300 ${sidebarOpen ? 'w-1/4' : 'w-0 overflow-hidden'}`}>
          <div className={`p-4 ${sidebarOpen ? 'block' : 'hidden'} max-h-[80vh] overflow-y-auto`}>
            <input
              type="text"
              placeholder="Search Blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white mb-4"
            />

            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredBlogs.map((blog) => (
                  <div key={blog._id} className="border border-gray-600 rounded-lg">
                    <BlogCard
                      blog={blog}
                      onFetchPosts={handleFetchedPost}
                      className="bg-gray-800 text-white shadow-md rounded-lg p-4 transition duration-200 hover:shadow-lg cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-300">No blogs available.</p>
            )}
          </div>
        </div>

        <div className={`w-3/4 p-4 transition-all duration-300 ${sidebarOpen ? 'ml-0' : 'ml-40'} ${!sidebarOpen ? '-mt-10 ' : '-mt-4'}`}>
          {selectedBlog ? (
            <div className={`flex flex-col justify-start items-center h-full ${sidebarOpen ? '' : 'overflow-hidden'}`}>
              <h2 className="text-3xl font-bold text-gray-200 text-center mb-2">Posts</h2>
              {posts.length > 0 ? (
                <div className={`${!sidebarOpen ? 'max-h-[34rem] ' : 'max-h-[31.5rem]'} overflow-y-auto w-full`}>
                  {posts.map((post, postIndex) => (
                    <div 
                      key={post._id} 
                      className="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-3 mx-7 mb-4" 
                      style={{ fontSize: '0.98rem' }} 
                    >
                      <h3 className="text-xl font-semibold mb-3 text-indigo-400">{post.title}</h3>
                      <p className="text-gray-300 mb-3">{post.content.substring(0, 150)}...</p>
                      <div className="text-sm text-gray-400 mb-2">
                        Published on: {new Date(post.created_at || post.publishDate).toLocaleDateString()}
                      </div>
                      <div className="flex justify-center flex-wrap gap-2 mb-4">
                        {post.tags?.map((tag, index) => (
                          <span key={index} className="bg-indigo-700 text-white px-3 py-1 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Carousel for images */}
                      {post.files && post.files.length > 0 ? (
                        <div className="flex flex-col items-center">
                          <img
                            src={`http://localhost:5000/uploads/${post.files[currentImageIndexes[postIndex] || 0]}`}
                            alt={`Post Image ${currentImageIndexes[postIndex] + 1}`}
                            className="w-1/2 h-auto rounded-lg shadow-md mb-2"
                          />
                          {post.files.length > 1 && (
                            <div className="flex justify-between w-full">
                              <button
                                onClick={() => handlePrevImage(postIndex)}
                                className="bg-indigo-600 text-white px-3 py-1 rounded-md"
                              >
                                &lt; {/* Use < symbol */}
                              </button>
                              <button
                                onClick={() => handleNextImage(postIndex)}
                                className="bg-indigo-600 text-white px-3 py-1 rounded-md"
                              >
                                &gt; {/* Use > symbol */}
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-red-500">No files available</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-300">No posts available for this blog.</p>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-300">Select a blog to read more.</p>
          )}
        </div>
        
      </div>
    </>
  );
};

export default BlogList;
