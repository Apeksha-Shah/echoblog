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
    if(bearer !== 'Bearer' || !token){
        return res.status(401).json({message:'Invalid token'});
    }

    jwt.verify(token,secretKey,(err,user)=>{
        if(err){
            return res.status(403).json({error:'Invalid token'});
        }
        req.user = user;
        next();
    })
}

export default authenticate;