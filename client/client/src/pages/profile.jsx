import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 
import { motion } from 'framer-motion';
import { FaRegEnvelope, FaBirthdayCake } from 'react-icons/fa'; 
import profileimage from '../assets/profile1.jpg';
import EditProfileModal from './editProfileModal'; 

const Profile = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [file, setFile] = useState(null);

  const fetchUserDetails = async () => {
    if (!token) {
      navigate('/login');
      return; 
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const author_id = decodedToken.id;

    try {
      const response = await axios.get(`http://localhost:5000/api/users/${author_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserDetails(response.data);
      setFile(response.data.profilePicture);
    } catch (error) {
      if (error.response && error.response.status === 403) {
          navigate('/login');
      } else {
          console.error('Error:', error);
      }
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [token, isModalOpen]); 

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateUserDetails = async (updatedDetails) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      ...updatedDetails,
    }));
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }} 
    >
      <Header />
      <div className="container mx-auto p-6">
        <div className="flex justify-center my-4">
          <img
            src={file ? `http://localhost:5000/uploads/${file}` : profileimage}
            alt="Profile"
            className="h-40 w-40 rounded-full border-4 border-blue-400 shadow-lg hover:shadow-2xl transition-shadow"
            onError={(e) => { e.target.src = profileimage; }}
          />
        </div>

        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-center text-2xl font-semibold text-white mb-4">Profile Details</h2>

          <p className="text-center text-lg mb-2 text-gray-300">
             {userDetails.firstName || "No firstname available."} 
          </p>
          <p className="text-center text-lg mb-2 text-gray-300">
            {userDetails.lastName || "No Lastname available."}
          </p>
          <p className="text-center text-lg mb-2 text-gray-300">
            {userDetails.bio || "No bio available."}
          </p>
          <p className="text-center text-lg mb-2 text-gray-300 flex items-center justify-center">
            <FaRegEnvelope className="mr-2 " /> 
            <span className="key text-blue-400 font-medium"></span> {userDetails.email}
          </p>
          <p className="text-center text-lg mb-8 text-gray-300 flex items-center justify-center">
            <FaBirthdayCake className="mr-2" />
            <span className="key text-blue-400 font-medium"></span> {userDetails.dateOfBirth ? new Date(userDetails.dateOfBirth).toLocaleDateString() : "Not specified"}
          </p>
        </div>

        <div className="text-center mb-6 mt-4">
          <button
            onClick={openModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2 shadow transition-shadow duration-300"
          >
            Edit Profile
          </button>
        </div>

        <EditProfileModal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          userDetails={userDetails} 
          onUpdateUserDetails={handleUpdateUserDetails} 
        />
      </div>
    </motion.div>
  );
};

export default Profile;
