import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';

const CreateBlog = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      title,
    });

    try{

        const token = localStorage.getItem('token');
        const decodedToken = JSON.parse(atob(token.split('.')[1])); 
        const author_id = decodedToken.id;
        console.log(author_id);

      const response = await axios.post('http://localhost:5000/api/blogs/', {
        title,
        author_id
      })

      resetFields();
      navigate('/home');

    }catch(err){
      console.log(err);
    }


  };

  const resetFields = () => {
    setTitle('');
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col p-5">

        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter blog title"
          className="text-2xl mb-5 p-3 w-full border border-gray-300 rounded"
          required
        />


        {/* Form Buttons */}
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
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
