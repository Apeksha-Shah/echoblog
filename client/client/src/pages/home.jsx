import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import '../App.css'; // Ensure you import your CSS file
import BlogCard from "./BlogCard";
import logo from '../assets/logo.png';

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        navigate("/login");
      }
      try {
        const response = await axios.get("http://localhost:5000/api/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (token) {
      fetchUser();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800">
      <Header />
      <div className="container mx-auto p-6">
        <div className="flex justify-center my-4">
          <img src={logo} alt="Logo" className="h-40 w-40 rounded-full" /> 
        </div>

        <h1 className="text-4xl text-center font-bold mb-4 text-blue-400">
          Welcome to EchoBlog
        </h1>
        <p className="text-center text-lg mb-8 text-gray-300">
          Share your thoughts, ideas, and stories with the world. Connect with fellow bloggers and readers!
        </p>

        <div className="text-center mb-6">
          <button
            onClick={() => navigate("/create-blog")} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Blog
          </button>
        </div>

        {/* Render the list of blogs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BlogCard className="bg-white shadow-md rounded-lg p-4 transition duration-200 hover:shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default Home;
