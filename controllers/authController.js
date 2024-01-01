import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const register = async(req, res) =>{
    try {
        const {name, email} = req.body;
        const user = await userModel.findOne({email: email});
        if(user){
            return res.status(400).json({
                success: false, 
                message: "user already exists"
            })
        }
        const newUser = await new userModel({name, email}).save();
        res.status(200).json({
            success: true, 
            message: "user created successfully", 
            newUser
        })
    } catch (error) {
        console.log("error while creating user")
        console.log(error)
        res.status(500).json({
            success: false, 
            message: "Internal server error", 
            error
        })
    }
}

const login = async(req, res) =>{
    try {
        const {email} = req.body;
        if(!email){
            res.status(400).json({
                success: false, 
                message: "email is required"
            })
        }
        const user = await userModel.findOne({email: email})
        if(!user){
            return res.status(400).json({
                success: false, 
                message: "user not found"
            })
        }
        const payload = {
            email: user.email, 
            name: user.name
        }

        const token = await jwt.sign(payload, process.env.SECRET, { expiresIn: '7d' });

        res.status(200).json({
            success: true, 
            message: "user logged in successfully", 
            token
        })
    } catch (error) {
        console.log("error while user login")
        console.log(error)
        res.status(500).json({
            success: false, 
            message: "Internal server error"
        })
    }
}



export {register, login}