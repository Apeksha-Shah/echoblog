import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaHome, FaPen, FaBars } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';

function Header({isAdmin}) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('User');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const threshold = 50;
    const newOpacity = Math.max(0.7, 1 - scrollY / (threshold * 0.5));
    setOpacity(newOpacity);

    if (scrollY > threshold) {
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
        isScrolled ? 'fixed bg-gradient-to-r from-gray-800 to-gray-900 top-0 z-50' : 'relative bg-gradient-to-r from-gray-800 to-gray-900'
      }`}
      style={{ opacity }}
    >
      <div className="flex items-center space-x-2">
        <FaPen className="text-2xl text-white" />
        <h1 className="text-xl font-bold text-white">EchoBlog</h1>
      </div>

      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-2xl bg-gradient-to-r from-gray-800 to-gray-900 focus:outline-none text-gray-300 hover:text-gray-400"
        >
          <FaBars />
        </button>
      </div>

      <nav
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:flex md:items-center space-y-4 md:space-y-0 md:space-x-6 mt-4 md:mt-0 w-full md:w-auto md:bg-transparent bg-gray-800 absolute md:relative top-16 left-0 md:top-auto md:left-auto z-10 md:z-auto p-4 md:p-0`}
      >
        { (!isAdmin) && (
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex items-center space-x-1 text-white hover:text-gray-300 ${isActive ? ' text-white font-semibold underline shadow-lg' : ''}`
          }
        >
          <FaHome className="text-lg" />
          <span>Home</span>
        </NavLink>
        ) }
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center space-x-1 text-white hover:text-gray-300 ${isActive ? 'text-white font-semibold underline shadow-lg' : ''}`
          }
        >
          <FaUserCircle className="text-lg" />
          <span>Profile</span>
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `flex items-center space-x-1 text-white hover:text-gray-300 ${isActive ? 'text-white font-semibold underline shadow-lg' : ''}`
          }
        >
          <span>Contact</span>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex items-center space-x-1 text-white hover:text-gray-300 ${isActive ? 'text-white font-semibold underline shadow-lg' : ''}`
          }
        >
          <span>About</span>
        </NavLink>
        <button
          onClick={handleLogout}
          className="text-blue-400 bg-gradient-to-r from-gray-800 to-gray-900 py-1 px-3 rounded-md hover:bg-blue-700 hover:text-white transition-all duration-200"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Header;
