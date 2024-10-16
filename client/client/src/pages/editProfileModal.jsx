import React, { useState } from 'react';
import axios from 'axios';

const EditProfileModal = ({ isOpen, onClose, userDetails, onUpdateUserDetails }) => {
  if (!isOpen) return null;

  const [firstName, setFirstName] = useState(userDetails.firstName || '');
  const [lastName, setLastName] = useState(userDetails.lastName || '');
  const [email, setEmail] = useState(userDetails.email || '');
  const [bio, setBio] = useState(userDetails.bio || '');
  const [dateOfBirth, setDateOfBirth] = useState(userDetails.dateOfBirth ? new Date(userDetails.dateOfBirth).toISOString().split('T')[0] : '');
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('bio', bio);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('role_id', userDetails.role_id);
    formData.append('username', userDetails.username);

    if (profileImage) {
      formData.append('profileImage', profileImage); 
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${userDetails._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      onUpdateUserDetails(response.data);
      onClose(); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg p-6 shadow-lg w-96 ">
        <h2 className="text-lg font-semibold text-white mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-300" htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full border border-gray-600 rounded p-2 bg-gray-700 text-white"
              placeholder="Enter your first name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300" htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full border border-gray-600 rounded p-2 bg-gray-700 text-white"
              placeholder="Enter your last name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              className="mt-1 block w-full border border-gray-600 rounded p-2 bg-gray-700 text-white"
              placeholder="Enter your email"
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300" htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-1 block w-full border border-gray-600 rounded p-2 bg-gray-700 text-white"
              placeholder="Tell us about yourself"
              rows="3"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300" htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="mt-1 block w-full border border-gray-600 rounded p-2 bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300" htmlFor="profileImage">Profile Image</label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              onChange={handleImageChange} 
              className="mt-1 block w-full border border-gray-600 rounded p-2 bg-gray-700 text-white"
              accept="image/*"
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
            <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
