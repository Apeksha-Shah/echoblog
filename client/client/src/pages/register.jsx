import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

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
      const response = await axios.post("http://localhost:5000/register", {
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
    <div className="flex flex-col px-6 py-4">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex items-center justify-center text-xl font-bold font-sans">
          <div>Sign Up</div>
        </div>

        <form
          className="mt-4 space-y-6 border p-8 rounded shadow-xl w-96"
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
                className="pl-10 h-10 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                className="pl-10 h-10 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                className="pl-10 h-10 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                className="pl-10 h-10 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="userType" className="block text-fm font-medium text-gray-900">
              Register as
            </label>
            <select
              id="userType"
              name="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="mt-1 h-10 block w-full pl-3 pr-10 py-2 text-base ring-1 ring-inset ring-gray-300 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full h-12 justify-center rounded-full bg-gray-800 px-3 py-2.5 text-sm leading-6 text-white shadow-sm hover:bg-gray-300 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
            {successMessage && <p className="text-green-500 text-xs mt-2">{successMessage}</p>}
          </div>

          <div className='flex items-center justify-center text-sm'>
            <p>Already have an account?
              <Link to="/login" className="text-blue-500 hover:underline"> Sign in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
