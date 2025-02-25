import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import {motion} from 'framer-motion';
import CommentModal from './commentModal';
import apiClient from '../axiosClient';


const BlogDetail = () => {
  const baseURL = apiClient.defaults.baseURL;
  console.log(baseURL);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [posts, setPosts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [currentBlogId, setCurrentBlogId] = useState('');
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const author_id = decodedToken.id;
  const [likedPosts, setLikedPosts] = useState({});
  const [jump, setJump] = useState({});
  const [title, setTitle] = useState('');
  const [numLikes, setNumLikes] = useState({});
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const { id } = useParams();
  const initialBlogId = id;
  const {isAdmin} = useLocation().state;

  useEffect(() => {
    if (!token) {
      navigate('/Login');
    }
    setCurrentBlogId(initialBlogId);  
  }, [initialBlogId]);

  const fetchPosts = async (blogid) => {
    try {
      // console.log(id);
      // console.log(blogid);
      const response = await apiClient.get(`/api/posts/blog/${blogid}`);
      // console.log("Post fetch");
      setPosts(response.data);
        posts.forEach(
        async (post) => {
          try {
            const LikebyPost = await apiClient.get(`/api/likes/post/${post._id}`);  // no of likes for each post
            const PostLikedByUser = await apiClient.get(`/api/likes/user/${author_id}`); 
            
            const isLiked = PostLikedByUser.data.includes(post._id);
            
            setNumLikes((prev) => ({ ...prev, [post._id]: LikebyPost.data.length }));
            setLikedPosts((prev) => ({ ...prev, [post._id]: isLiked }));
          } catch (err) {
            console.log(err);
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBlogs = async () => {
    // console.log("blog fetch");
    try {
      const response = await apiClient.get(`/api/blogs/author/${author_id}`);
      if (response.data) {
        setBlogs(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTitle = async () => {
    try {
      const response = await apiClient.get(`/api/blogs/${currentBlogId}`);
      if (response.data) {
        setTitle(response.data.title);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentBlogId) {
      fetchPosts(currentBlogId);
      fetchTitle();
    }
    fetchBlogs();
  }, [currentBlogId,title]);  
  
  const handleBlogChange = (event) => {
    const selectedBlogId = event.target.value;
    setCurrentBlogId(selectedBlogId);  
    navigate(`/blog/${selectedBlogId}`);
  };

  const [currentImageIndexes, setCurrentImageIndexes] = useState([]);

  useEffect(() => {
    if (posts.length > 0) {
      setCurrentImageIndexes(Array(posts.length).fill(0));
    }
  }, [posts]);

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

  const handleComments = () => {
    setCommentModalOpen(true);
  }

  const closeModal = () => {
    setCommentModalOpen(false);

  }

  const handleLike = async (post) => {
    const isLiked = likedPosts[post._id];

    try {
      if (isLiked) 
      {
        await apiClient.delete(`/api/likes`, {
          params: {
             post_id: post._id, 
             user_id: author_id 
          }
        });
        setNumLikes((prev) => ({ ...prev, [post._id]: (prev[post._id] || 0) - 1 }));
      } 
      else 
      {
        await apiClient.post('/api/likes', {
           post_id: post._id, 
           user_id: author_id 
        });
        setNumLikes((prev) => ({ ...prev, [post._id]: (prev[post._id] || 0) + 1 }));
      }
      setLikedPosts((prev) => ({ 
        ...prev, 
        [post._id]: !isLiked 
      }));
      setJump((prev) => ({ 
        ...prev, 
        [post._id]: true
      }));
      setTimeout(() => {
        setJump((prev) => ({ ...prev, [post._id]: false }));
      }, 300); 

    } catch (err) {
      console.log(err);
    }
  };

  const handleShare = () => {

  }

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await apiClient.delete(`/api/posts/${postId}`);
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      } catch (err) {
        console.error('Error deleting post:', err);
        alert('Failed to delete post. Please try again.');
      }
    }
  }


  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }} 
    > 
    <Header/>
      <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white flex flex-col">
        {!isAdmin && (
        <div className="mt-6 flex flex-col md:flex-row justify-center items-center mb-4">
          <div className="w-full md:w-1/4 pr-2 mb-4 md:mb-0">
            <select 
              onChange={handleBlogChange} 
              className="bg-gray-700 text-white rounded-md p-2 w-full"
              value={currentBlogId || ""} 
            >
              <option value="" disabled>{title || "Select a blog"}</option>
              {blogs.map((blogItem) => (
                <option key={blogItem._id} value={blogItem._id}>
                  {blogItem.title}
                </option>
              ))}
            </select> 
          </div>

          <div className="w-full md:w-1/4 pl-2">
            <button
              onClick={() => navigate('/create-post', { state: { blogId: currentBlogId } })}
              className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md w-full"
              disabled={!currentBlogId}
            >
              Create Post
            </button>
          </div>
        </div>
        )}

        <div className="flex-grow w-full p-4">
          <h2 className="text-3xl font-bold text-gray-200 text-center mb-4">Posts</h2>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
            {posts.map((post, postIndex) => (
              <div 
                key={post._id} 
                className="bg-gray-800 border border-gray-700 rounded-lg shadow-md p-3 mx-32"
                style={{ fontSize: '0.98rem' }} 
              >
                {!isAdmin && (
                  <div className="flex justify-end gap-2">
                    <button className="text-blue-400 bg-gradient-to-r from-gray-800 to-gray-900 py-1 px-3 rounded-md hover:bg-blue-700 hover:text-white transition-all duration-200"
                            onClick={() => navigate(`/edit-post/${post._id}`, { state: { post }})}
                    >
                      Edit Post
                    </button>
                    <button className="text-blue-400 bg-gradient-to-r from-gray-800 to-gray-900 py-1 px-3 rounded-md hover:bg-blue-700 hover:text-white transition-all duration-200"
                            onClick={() => handleDeletePost(post._id)}
                    >
                      Delete Post
                    </button>
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-3 text-indigo-400 -mt-4">{post.title}</h3>
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
                {post.files && post.files.length > 0 ? ( 
                  <div className="flex justify-center mb-3">
                    {post.files.some(file => file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg')) ? (
                      <div className="relative">
                        <img
                          src={`${baseURL}/uploads/${post.files[currentImageIndexes[postIndex] || 0]}`}
                          alt={`Post Image ${currentImageIndexes[postIndex] + 1}`}
                          className="w-1/2 h-auto rounded-lg shadow-md inline"
                        />
                        {post.files.length > 1 && (
                          <div className="absolute top-1/2 left-0 right-0 flex justify-around items-center">
                            <button className="bg-indigo-600 text-white p-2 rounded-full" onClick={() => handlePrevImage(postIndex)}>
                              &#10094;
                            </button>
                            <button className="bg-indigo-600 text-white p-2 rounded-full" onClick={() => handleNextImage(postIndex)}>
                              &#10095;
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-red-500">No images available</p>
                    )}
                  </div>
                ) : (
                  <p className="text-red-500">No files available</p>
                )}
                {
                  isAdmin ? (<CommentModal isOpen={isCommentModalOpen} onClose={closeModal} post = {post} isauthor={true} isAdmin={true}/>) : (<CommentModal isOpen={isCommentModalOpen} onClose={closeModal} post = {post} isauthor={true}/>)
                }

                <div className="flex justify-center items-center mt-4 gap-2 p-2">
                      <button 
                            className={`transition-colors duration-200 px-3 py-1 rounded-md ${likedPosts[post._id] ? 'text-blue-500 bg-gradient-to-r from-gray-800 to-gray-900' : 'text-gray-400 bg-gradient-to-r from-gray-800 to-gray-900 hover:text-blue-500'} ${jump[post._id] ? 'jump-animation' : ''}`}
                            onClick={() => handleLike(post)}
                        >

                            <FontAwesomeIcon icon={faThumbsUp} className='mr-1' /> 
                            Liked by {numLikes[post._id] || 0} 
                        </button>
                        <button 
                            className="text-gray-400 bg-gradient-to-r from-gray-800 to-gray-900 hover:text-green-500 transition-colors duration-200"
                            onClick={() => handleComments(post)}
                        >
                            <FontAwesomeIcon icon={faComment} />
                        </button>
                        <button 
                            className="text-gray-400 bg-gradient-to-r from-gray-800 to-gray-900 hover:text-purple-500 transition-colors duration-200"
                            onClick={() => handleShare(post)}
                        >
                            <FontAwesomeIcon icon={faShare} />
                        </button>
                      </div>

              </div>
            ))}
          </div>          


          ) : (
            <div className="flex justify-center items-center min-h-full">
              <p className="text-center text-gray-300">No posts available for this blog.</p>
            </div>
          )}
        </div>
      </div>
      </motion.div>
  );
};

export default BlogDetail;
