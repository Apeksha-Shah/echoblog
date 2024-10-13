import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaHome, FaPen, FaBars } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('User');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) { // Set threshold for scroll, 50px in this case
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`w-full text-lg shadow-md p-4 flex justify-between items-center m-0 transition-all duration-300 ${
        isScrolled ? 'fixed bg-gray-100 bg-opacity-80 top-0 z-50' : 'relative bg-gray-100'
      }`}
    >
      <div className="flex items-center space-x-2">
        <FaPen className="text-2xl" />
        <h1 className="text-xl font-bold">MyBlog</h1>
      </div>

      {/* Hamburger menu for small screens */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-2xl focus:outline-none">
          <FaBars />
        </button>
      </div>

      {/* Navigation links */}
      <nav
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:flex md:items-center space-y-4 md:space-y-0 md:space-x-6 mt-4 md:mt-0 w-full md:w-auto md:bg-transparent bg-white absolute md:relative top-16 left-0 md:top-auto md:left-auto z-10 md:z-auto p-4 md:p-0`}
      >
        <a href="/" className="flex items-center space-x-1 hover:text-gray-500">
          <FaHome className="text-lg" />
          <span>Home</span>
        </a>
        <a href="/profile" className="flex items-center space-x-1 hover:text-gray-500">
          <FaUserCircle className="text-lg" />
          <span>Profile</span>
        </a>
        <a href="/contact" className="flex items-center space-x-1 hover:text-gray-500">
          <span>Contact</span>
        </a>
        <a href="/about" className="flex items-center space-x-1 hover:text-gray-500">
          <span>About</span>
        </a>
        <button
          onClick={handleLogout}
          className="text-blue-500 py-1 px-3 rounded-md hover:bg-blue-100 transition-all duration-200"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Header;
