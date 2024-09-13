import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import transporter from "../nodeMailer/Mail.js";
import authUtils from "../utils/authUtils.js";
import generateOTP from "../config/generateOTP.js";

const { generateToken,generateRefreshToken,verifyToken } = authUtils;

const otpcache = {};

const getAllUsers = (req,res)=>{
    const users = User.find().then((users)=>{
        res.json(users);
    }).catch((err)=>{
        res.status(400).json('Error: '+err);
    })
}

const getSpecificUser = (req,res)=>{
    const user = User.findById(req.params.id).then((user)=>{
        res.json(user);
    }).catch((err)=>{
        res.status(400).json('Error: '+err);
    })
}

const login = async (req,res) => {
    const {email,password} = req.body;
    // console.log("hey"+ email+" "+ password);
    if(!email || !password){
        return res.status(400).json({require:'All fields are required'});
    }
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({loginerror:'Logged in failed'});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        // console.log(isMatch);
        if(isMatch){
            const token = generateToken(user);
            res.status(200).json({mes:'Logged in successfully', token:token, user: user});
        }
        else{
            res.status(400).json({password:'Logged in failed'});
        }
    }catch(err){
        res.status(400).json('Error: '+err.message);
    }
}


const createUser = async (req, res) => {
    const { username, email, password, userType } = req.body;
  
    if (!username || !email || !password || !userType) {
      return res.status(400).json({ require: "All fields are required" });
    }
  
    try {
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ username: "Username already exists" });
      }
  
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ email: "Email already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      let role_id = "66c0e8174c7bcb4632a34ba4"; 
      if (userType.toLowerCase() === "admin") {
        role_id = "66c0e80c4c7bcb4632a34ba2"; 
      }
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role_id,
      });
  
      const OTP = generateOTP();
      otpcache[email] = OTP;
  
     
      let mailOptions = {
        from: {
          address: process.env.EMAIL,
          name: "Echoblog",
        },
        html: `<h1>Your OTP: ${OTP}</h1>`,
        to: email,
        subject: "Verification Email",
      };
  
      try {
      
        await transporter.sendMail(mailOptions);
        console.log("Email sent");
        
        await newUser.save();  
        
        res.status(201).json("User added. OTP sent to email.");
      } catch (emailError) {
        console.log("Email sending failed: " + emailError.message);
        return res.status(500).json({ error: "Email sending failed" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Error: " + err.message);
    }
  };

const verifyOtp = async (req,res) => {
    const {otp,email} = req.body;
    if(!otp){
        return res.status(400).json({require:'Please enter OTP'});
    }
    else{
        if(otpcache[email].toString() === otp.toString()){
            res.status(200).json('OTP verified');
        }
        else{
            res.status(400).json({msg:'OTP verification failed'});
        }
    }
}

const updateUser = async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {username,email,password,role_id} = req.body;
        if(username){
            user.username = username;
        }
        if(email){
            user.email = email;
        }
        if(password){
            user.password = await bcrypt.hash(password,10);
        }
        if(role_id){
            user.role_id = role_id;
        }
        await user.save();
        res.status(201).json('User updated');
    }catch(err){
        res.status(400).json('Error: '+err);
    }
}

const deleteUser = (req,res)=>{
    User.findByIdAndDelete(req.params.id).then(()=>{
        res.json('User deleted');
    }).catch((err)=>{
        res.status(400).json('Error: '+err);
    })
}

export default {getAllUsers,getSpecificUser,createUser,updateUser,deleteUser,login,verifyOtp};