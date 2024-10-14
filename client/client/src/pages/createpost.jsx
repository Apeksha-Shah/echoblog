import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

const CreatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const blogId = location.state?.blogId;
  const token = localStorage.getItem('token');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [publishDate, setPublishDate] = useState('');

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleFileUpload = (e) => setFiles(e.target.files);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleTagsChange = (e) => setTags(e.target.value);
  const handlePublishDateChange = (e) => setPublishDate(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem('token');
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const author_id = decodedToken.id;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);
        formData.append('tags', tags.split(',').map((tag) => tag.trim()));
        formData.append('publishDate', publishDate);
        formData.append('author_id', author_id);
        formData.append('blogId', blogId);

        Array.from(files).forEach((file) => {
            formData.append('files', file); 
        });

     
        await axios.post('http://localhost:5000/api/posts/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}` 
            }
        });

        resetFields();
        navigate(`/blog/${blogId}`, { state: { blogId } });
    } catch (err) {
        console.log(err);
    }
};


  const resetFields = () => {
    setTitle('');
    setContent('');
    setFiles([]);
    setCategory('');
    setTags('');
    setPublishDate('');
  };

  useEffect(()=>{
    if(!token){
      navigate('/Login');
    }
  },[])

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white min-h-screen">
      <Header />
      <div className="flex flex-col p-5">
        <form method='POST' onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter Post Title"
            className="text-2xl mb-5 p-3 w-full rounded bg-gray-700 text-white focus:outline-none" // Removed border styles
            required
          />

          <div className="flex space-x-4 mb-5">
            <input
              type="file"
              accept="image/*,video/*"
              name='files'
              onChange={handleFileUpload}
              className="file:mr-5 text-sm bg-gray-700 text-white focus:outline-none"
              multiple
            />
          </div>

          <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5 mb-5">
            <textarea
              value={content}
              onChange={handleContentChange}
              placeholder="Write your post content here..."
              className="w-full md:w-3/4 h-96 p-3 rounded resize-none bg-gray-700 text-white focus:outline-none" // Removed border styles
              required
            />

            <div className="w-full md:w-1/2 bg-gray-800 p-5 rounded space-y-5">
              <div>
                <label className="block text-gray-300 text-sm font-bold mb-2">Category</label>
                <select
                  value={category}
                  onChange={handleCategoryChange}
                  className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none" // Removed border styles
                  required
                >
                  <option value="">Select category</option>
                  <option value="Technology">Technology</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Education">Education</option>
                  <option value="Business">Business</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Current Events">Current Events</option>
                  <option value="Hobbies and Interests">Hobbies and Interests</option>
                  <option value="Parenting">Parenting</option>
                  <option value="Personal Development">Personal Development</option>
                  <option value="Reviews">Reviews</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-bold mb-2">Tags</label>
                <input
                  type="text"
                  value={tags}
                  onChange={handleTagsChange}
                  placeholder="Enter tags (comma separated)"
                  className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none" // Removed border styles
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-bold mb-2">Publish Date</label>
                <input
                  type="date"
                  value={publishDate}
                  onChange={handlePublishDateChange}
                  className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none" // Removed border styles
                />
              </div>
            </div>
          </div>

          <div className="flex flex-start space-x-3">
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
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
