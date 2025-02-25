import React, { useReducer,useState } from "react";
import Register from "./register";
import { Link, Navigate, useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.css'
import '../assets/verifyotp.css';
import apiClient from "../axiosClient";

const reducer = (state,action) => {
    switch(action.type){
        case "otp":
            return {...state,otp:action.value};
        default:
            return state;
    }
};

function VerifyOTP(){
  const [state, dispatch] = useReducer(reducer,{
    otp:""
  });

  const location = useLocation();
  const { email } = location.state || {}; 
  if(!email){
    return <Navigate to="/register" />;
  }

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const SubmitHandler = async (e) => {
     e.preventDefault();

     try{
        const response = await apiClient.post("auth/verifyotp",{
            otp: state.otp.toString(),
            email
        });
        resetForm();
        navigate("/login");
    } catch (err) {
      if (err.response) {
        setErrors(err.response.data);
      } else {
        console.log(err);
      }
     }
  }

  const resetForm = () => {
    dispatch({type:"otp",value:""});
  }

  
  return (
    <div className="flex flex-col px-6 py-12 ">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        
        <form
          className="space-y-6 border p-8 rounded shadow-xl w-96"
          method="POST"
          onSubmit={SubmitHandler}
        >
          <div>
            <div className="relative mt-2">
              <input
                id="otp"
                name="otp"
                type="number"
                placeholder="Enter OTP"
                required
                value={state.otp}
                onChange={(e) => dispatch({type:"otp",value:e.target.value})}
                className="pl-10 h-12 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            
      </div>
          <div>
            <button
              type="submit"
              className="h-12 flex w-full justify-center rounded-full bg-gray-800 px-3 py-2.5 text-sm leading-6 text-white shadow-sm hover:bg-gray-200 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Verify OTP
            </button>
            {errors.msg && <div className="text-red-500 text-sm">{errors.msg}</div>}
            {errors.require && <div className="text-red-500 text-sm">{errors.require}</div>}
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;