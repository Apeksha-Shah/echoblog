import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'; 
import axios from 'axios';

const CommentModal = ({ isOpen, onClose, post, isauthor,isAdmin }) => {
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem('token');
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const author_id = decodedToken.id;

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/comments/post/${post._id}`);
      const data = response.data;
      setComments(data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen, post._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/comments', {
        post_id: post._id,
        content: message,
        user_id: author_id,
      });

      setComments((prevComments) => [...prevComments, response.data]);
      setMessage('');
      await fetchComments();
    } catch (err) {
      console.error('Error submitting comment:', err);
      alert('Failed to submit comment. Please try again.');
    }
  };

  const handleDelete = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await axios.delete(`http://localhost:5000/api/comments/${commentId}`);
        setComments(comments.filter((comment) => comment._id !== commentId));
      } catch (err) {
        console.error('Error deleting comment:', err);
        alert('Failed to delete comment. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${isOpen ? '' : 'hidden'}`}>
        <div className="bg-gray-800 p-6 rounded-lg w-1/2 shadow-xl transform transition-all ease-in-out duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Comments</h2>
            <button type="button" onClick={onClose} className="text-gray-500 hover:text-white bg-gray-800">
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
          </div>

          <div className="max-h-60 overflow-y-auto mb-4  p-2 bg-gray-800">
            {comments.map((comment) => (
              <div key={comment._id} className="bg-gray-800 p-3 mb-2 border border-gray-300 rounded-md text-gray-800 flex justify-between items-start shadow-xl">
                <div>
                  <p className="mb-1 text-white">{comment.content}</p>
                  <span className="text-gray-500 text-sm">
                    {`Commented by: ${comment.user_id ? comment.user_id.username : 'Unknown User'}`}
                  </span>
                  <br/>
                  <span className="text-gray-500 text-sm">
                    {`${new Date(comment.created_at).toLocaleDateString()}`}
                  </span>
                </div>
                {isauthor || (comment.user_id && comment.user_id._id === author_id) ? (
                    <button
                        type="button"
                        onClick={() => handleDelete(comment._id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200 transform hover:scale-110 bg-gray-800"
                    >
                        <FontAwesomeIcon icon={faTrash} size="lg" />
                    </button>
                    ) : null}
              </div>
            ))}
          </div>

          {
            !isAdmin && (
              <div>
                <textarea
                  className="w-full p-3 bg-gray-50 text-gray-800 rounded-md mb-4 shadow-inner border border-gray-300"
                  placeholder="Write a comment..."
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 shadow-lg transform transition-transform duration-200 hover:scale-105" type="submit">
                  Add comment
                </button>
              </div>
              )
          }
          
        </div>
      </div>
    </form>
  );
};

export default CommentModal;
