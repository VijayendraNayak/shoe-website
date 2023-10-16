import User from "../models/User.modles.js";
import bcryptjs from "bcryptjs";
// import { errorhandler } from "../utils/error.js";
export const signup=async(req,res,next)=>{
    const {username,email,password}=req.body;
    const hashedpassword=bcryptjs.hashSync(password,10)
    const newuser=new User({username,email,password:hashedpassword})
    try {
        await newuser.save();
        res.status(201).json("User created successfully");
    } catch (error) {
        next(error);
        // next(errorhandler(550,"message"))
    }
}