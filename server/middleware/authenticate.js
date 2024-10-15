import express from 'express';
import jwt from 'jsonwebtoken';
import authUtils from '../utils/authUtils.js';
import secretKey from '../config/jwtConfig.js';

const authenticate = (req,res,next) => {
    const authheader = req.header('Authorization');
    if(!authheader){
        return res.status(401).json({error:'Access denied'});
    }

    const [bearer,token] = authheader.split(' ');
    // console.log(token);
    if(bearer !== 'Bearer' || !token){
        return res.status(401).json({message:'token required'});
    }

    jwt.verify(token,secretKey,(err,user)=>{
        // console.log(secretKey,user);
        if(err){
            console.log("Invalid token");
            return res.status(403).json({ message: 'Invalid token, please log in again' });
        }
        req.user = user;
        next();
    })
}

export default authenticate;