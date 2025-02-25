import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import apiClient from "../axiosClient";

function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [userType, setUserType] = React.useState("user");
  const [username, setUsername] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [successMessage, setSuccessMessage] = React.useState("");
  const navigate = useNavigate();

  const submithandler = async (e) => {
    e.preventDefault();

    setErrors({});
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setErrors({ ...errors, password: "Passwords do not match" });
      return;
    }

    try {
      const response = await apiClient.post("/register", {
        username,
        email,
        password,
        userType,
      });
      
      setSuccessMessage("User successfully registered!");
      resetForm();
      navigate("/verifyotp", { state: { email } });

    } catch (err) {
      if (err.response) {
        setErrors(err.response.data);
      } else {
        console.log(err);
      }
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUsername("");
    setUserType("user");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex items-center justify-center text-xl font-bold font-sans text-white mb-4">
          <div>Sign Up</div>
        </div>

        <form
          className="space-y-6 p-8 rounded-lg shadow-lg bg-gray-800"
          onSubmit={submithandler}
        >
          <div>
            <div className="relative mt-2">
              <i className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fa-solid fa-envelope"></i>
              </i>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 h-12 block w-full rounded-md bg-gray-700 text-white focus:outline-none placeholder:text-gray-400"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <div className="relative mt-2">
              <i className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fa-solid fa-user"></i>
              </i>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="pl-10 h-12 block w-full rounded-md bg-gray-700 text-white focus:outline-none placeholder:text-gray-400"
              />
            </div>
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>

          <div>
            <div className="relative mt-2">
              <i className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fa-solid fa-lock"></i>
              </i>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 h-12 block w-full rounded-md bg-gray-700 text-white focus:outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          <div>
            <div className="relative mt-2">
              <i className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fa-solid fa-eye"></i>
              </i>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="pl-10 h-12 block w-full rounded-md bg-gray-700 text-white focus:outline-none placeholder:text-gray-400"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="userType" className="text-white block text-sm font-medium text-gray-900">
              Register as
            </label>
            <select
              id="userType"
              name="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="mt-1 h-10 block w-full pl-3 pr-10 py-2 text-base ring-1 ring-inset ring-gray-300 bg-gray-700 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="h-12 flex w-full justify-center rounded-full bg-blue-500 hover:bg-blue-700 px-3 py-2.5 text-sm leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Sign Up
            </button>
            {successMessage && <p className="text-green-500 text-xs mt-2">{successMessage}</p>}
          </div>

          <div className='flex items-center justify-center text-sm'>
            <p className="text-white">Already have an account?
              <Link to="/login" className="text-blue-500 hover:underline"> Sign in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
