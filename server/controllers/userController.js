import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import transporter from "../nodeMailer/Mail.js";

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

const createUser = async (req, res) => {
    const { username, email, password, userType } = req.body;

    if (!username || !email || !password || !userType) {
        return res.status(400).json({require:'All fields are required'});
    }

    try {
        const existingUsername = await User.findOne({username});
        if(existingUsername){
            return res.status(400).json({username:'Username already exists'});
        }

        const existingemail = await User.findOne({email});
        if(existingemail){
            return res.status(400).json({email:'Email already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let role_id = "66c0e8174c7bcb4632a34ba4";
        if(userType === 'Admin')
            role_id = "66c0e80c4c7bcb4632a34ba2";

        const newUser = new User({
            username,
            email,
            password: hashedPassword,   
            role_id
        });

        await newUser.save();

        (async () => {
            let mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'This is a test email',
                text: 'Hello, this is a test email from Node.js',
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log("Email sent");
            } catch (err) {
                console.log("Email sending failed: " + err.message);
            }
        })();
        
        res.status(201).json('User added');
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};

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

export default {getAllUsers,getSpecificUser,createUser,updateUser,deleteUser};