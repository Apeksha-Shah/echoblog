import React, { useReducer, useState } from "react";
import Register from "./register";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.css'


const reducer = (state,action) => {
    switch(action.type){
        case "email":
            return {...state,email:action.value};
        case "password":
            return {...state,password:action.value};
        default:
            return state;
    }
};

function Login(){
  const [state, dispatch] = useReducer(reducer,{
    email:"",
    password:""
  });

  const [errors, setErrors] = useState({});
  const [SuccessMessage, setSuccessMessage] = useState({});
  const navigate = useNavigate();


  const SubmitHandler = async (e) => {
     e.preventDefault();

     setErrors({});
     setSuccessMessage({});

     try{
        const response = await axios.post("http://localhost:5000/auth/login",{
            email:state.email,
            password:state.password
        });
        setSuccessMessage(response.data);
        // console.log(response.data);
        resetForm();
        navigate("/verifyotp");
        navigate("/home");
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("User",response.data.user);

    } catch (err) {
      if (err.response) {
        setErrors(err.response.data);
      } else {
        console.log(err);
      }
     }
  }

  const resetForm = () => {
    dispatch({type:"email",value:""});
    dispatch({type:"password",value:""});
  }

  
  return (
    <div className="flex flex-col px-6 py-12 ">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      
      <div className="flex items-center justify-center mb-4">
         <i className="fa-solid fa-users text-6xl text-indigo"></i>
      </div>
        
        <form
          className="space-y-6 border p-8 rounded shadow-xl w-96"
          action="loggedin"
          method="POST"
          onSubmit={SubmitHandler}
        >
          <div>
            <div className="relative mt-2">
              <i className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fa-solid fa-user"></i>
              </i>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Username or email"
                required
                value={state.email}
                onChange={(e) => dispatch({type:"email",value:e.target.value})}
                className="pl-10 h-12 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="mt-2 relative">
              <i className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <i className="fa-solid fa-lock"></i>
              </i>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
                value={state.password}
                onChange={(e)=>dispatch({type:"password",value:e.target.value})}
                className="pl-10 h-12 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-sm">
              <input type="checkbox" id="rememberMe" className="form-checkbox h-4 w-4 text-indigo-600"/>
              <label htmlFor="rememberMe" className="ml-2 text-black text-sm">Remember me</label>
            </div>
            <a href="#" className="ml-4 pl-16 text-black hover:text-black text-sm hover:underline">
              Forgot password?
            </a>
          </div>
        </div>
      </div>
          <div>
            <button
              type="submit"
              className="h-12 flex w-full justify-center rounded-full bg-gray-800 px-3 py-2.5 text-sm leading-6 text-white shadow-sm hover:bg-gray-200 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
          {SuccessMessage && <p className="text-green-500 text-xs mt-1">{SuccessMessage.mes}</p>}
          {errors.require && <p className="text-red-500 text-xs mt-1">{errors.require}</p>}
          {errors.loginerror && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}

          <div class='flex items-center justify-center text-sm'>
              <p>Don't have an account?
              <Link to="/register" className="text-blue-500 hover:underline"> Sign up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login