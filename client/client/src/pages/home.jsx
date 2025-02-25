import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import '../App.css'; // Ensure you import your CSS file
import BlogCard from "./BlogCard";
import logo from '../assets/logo.png';
import {motion} from 'framer-motion';
import apiClient from "../axiosClient";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        navigate("/login");
      }
      try {
        const response = await apiClient.get("/api/users/", {
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
      // fetchUser();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

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
          <img src={logo} alt="Logo" className="h-40 w-40 rounded-full" /> 
        </div>

        <h1 className="text-4xl text-center font-bold mb-4 text-blue-400">
          Welcome to EchoBlog
        </h1>
        <p className="text-center text-lg mb-8 text-gray-300">
          Share your thoughts, ideas, and stories with the world. Connect with fellow bloggers and readers!
        </p>

        <div className="text-center mb-6 ">
          <button
            onClick={() => navigate("/create-blog")} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
          >
            Create Blog
          </button>
          <button
            onClick={() => navigate("/blogList")} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
          >
            Reading List 
          </button>
        </div>

      </div>
    </motion.div>
  );
};

export default Home;
