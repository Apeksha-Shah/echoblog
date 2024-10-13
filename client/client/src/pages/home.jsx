import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import '../App.css'; // Ensure you import your CSS file
import BlogCard from "./BlogCard";
import Blogdetail from "./blogdetail";

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
    <div>
      <Header />
      <div className="p-8">
        <button
          onClick={() => navigate("/create-blog")} // Redirect to the CreateBlog page
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Create Blog
        </button>

        {/* Render the list of blogs */}
        <BlogCard />
      </div>
    </div>
  );
};

export default Home;
