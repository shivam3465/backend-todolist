import jwt from "jsonwebtoken"
import { User } from "../models/user.js";

export const authenticated= async (req,res,next)=>{
    try {
        const {token}=req.cookies;    

        if(!token){
            res.status(202).json({success: false, message:" Login first"});
        }
        else{
            const user= await User.findById(jwt.verify(token,process.env.secret_key));    
            req.user=user;
            next();
        }  
    } 
    catch (error) {
        res.status(404).json({
            success:false, message:error.message
        })
    }
}