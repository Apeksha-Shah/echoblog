import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Home = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const submithandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("User");
        navigate("/login");
    }
    
    useEffect(() =>{
        try{
            const fetchUser =  async () => {
                if (!localStorage.getItem("token")) {
                    navigate("/login");
                }
                try{
                    const response = await axios.get("http://localhost:5000/api/users/",{
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    });
                    const allusers = await response.data;
                    console.log(allusers);
                }catch(err){
                    console.log(err);
                }
            }
            if(token){
                fetchUser();
            }
            else{
                navigate("/login");
            }
        }catch(err){
            console.log(err);
        }
    },[token])


    return(
        <>
           <h1>Home Page</h1>
           <button onClick={submithandler}>Logout</button>
        </>
    );
}

export default Home;