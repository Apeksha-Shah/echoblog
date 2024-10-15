import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faShare } from '@fortawesome/free-solid-svg-icons';


const BlogDetail = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const author_id = decodedToken.id;
  const [likedPosts, setLikedPosts] = useState({});
  const [jump, setJump] = useState({});
  const [title, setTitle] = useState('');
  const [numLikes, setNumLikes] = useState({});
  
  const { blogId: initialBlogId } = location.state || {};

  useEffect(() => {
    if (!token) {
      navigate('/Login');
    }
    setCurrentBlogId(initialBlogId);  
  }, [initialBlogId]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/blog/${currentBlogId}`);
        if (response.data) {
          setPosts(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/author/${author_id}`);
        if (response.data) {
          setBlogs(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const fetchTitle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/${currentBlogId}`);
        if (response.data) {
          setTitle(response.data.title);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (currentBlogId) {
      fetchPosts();
      fetchTitle();
    }
    fetchBlogs();  
  }, [currentBlogId]);  

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

  useEffect(() => {
    
    const fetchLikedPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/likes/user/${author_id}`);
        const likedPostIds = response.data;
        setLikedPosts(prevLikedPosts => {
          const newLikedPosts = {...prevLikedPosts};
          likedPostIds.forEach(id => {
            newLikedPosts[id] = true; 
          });
          return newLikedPosts;
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchLikedPosts();

  },[])

  useEffect(()=> {
    const fetchNumLikes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/likes/num-likes`);
        const likesData = response.data.reduce((acc, likeData) => {
          acc[likeData._id] = likeData.count;
          return acc;
        }, {});
        console.log(likesData);
        setNumLikes(likesData);
      } catch (err) {
        console.log(err);
      }
  }

  fetchNumLikes();

  },[numLikes])
  
  const handleLikes = async (post) => {
    // console.log(post._id);

    const isLiked = likedPosts[post._id] || false; 
    if (!isLiked) {
        try {
            await axios.post(`http://localhost:5000/api/likes`, {
                post_id: post._id,
                user_id: author_id
            });
            setLikedPosts((prev) => ({ ...prev, [post._id]: true })); 
            setJump(prev => ({ ...prev, [post._id]: true }));
            setNumLikes((prev) => ({ 
              ...prev, 
              [post._id]: (prev[post._id] || 0) + 1 
            }));
            setTimeout(() => {
              setJump(prev => ({ ...prev, [post._id]: false })); 
            }, 300);
        } catch (err) {
            console.log(err);
        }
    } else {
      // console.log('unliking');
        try {
            await axios.delete(`http://localhost:5000/api/likes`, {
                params:
                {
                  post_id: post._id,
                  user_id: author_id 
                }
            });
            setLikedPosts((prev) => ({ ...prev, [post._id]: false }));
            setJump(prev => ({ ...prev, [post._id]: true }));
            setNumLikes((prev) => ({ 
              ...prev, 
              [post._id]: (prev[post._id] || 0) - 1 
            }));
            setTimeout(() => {
              setJump(prev => ({ ...prev, [post._id]: false })); // Reset jump state
            }, 300); 
        } catch (err) {
            console.log(err);
        }
    }
};

  const handleShare = () => {

  }

  const handleComments = () => {

  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white flex flex-col">
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
                <div className="flex justify-end">
                  <button className="text-blue-400 bg-gradient-to-r from-gray-800 to-gray-900 py-1 px-3 rounded-md hover:bg-blue-700 hover:text-white transition-all duration-200"
                          onClick={() => navigate(`/edit-post/${post._id}`, { state: { post }})}
                  >
                    Edit Post
                  </button>
                </div>
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
                          src={`http://localhost:5000/uploads/${post.files[currentImageIndexes[postIndex] || 0]}`}
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
                
                <div className="flex justify-center items-center mt-4 gap-2 p-2">
                      <button 
                            className={`transition-colors duration-200 px-3 py-1 rounded-md ${likedPosts[post._id] ? 'text-blue-500 bg-gradient-to-r from-gray-800 to-gray-900' : 'text-gray-400 bg-gradient-to-r from-gray-800 to-gray-900 hover:text-blue-500'} ${jump[post._id] ? 'jump-animation' : ''}`}
                            onClick={() => handleLikes(post)}
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
    </>
  );
};

export default BlogDetail;
