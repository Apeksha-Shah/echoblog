import express from "express";
import Role from "../models/roleModel.js";

const getAllRoles = async (req,res)=>{
    try{
        const roles = await Role.find();
        res.json(roles);
    }catch(err){
        res.status(400).json('Error: '+err);
    }
}

const createRole = async (req, res) => {
    const { role_name } = req.body;
    try {
        const newRole = new Role({
            role_name,
        });
        await newRole.save();
        res.status(201).json('Role added');
    } catch (err) {
        res.status(500).json('Error: ' + err.message);
    }
};


export default {getAllRoles,createRole};