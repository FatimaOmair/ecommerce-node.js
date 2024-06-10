import userModel from "../../db/model/user.model.js";
import { appError } from "../ults/appError.js";

export const checkEmail=async(req,res,next)=>{
    const {email} = req.body;
    const user= await userModel.findOne({email})
   
    if(user){
    // return res.status(409).json({meessage:"email already in use"})
     return next(new appError(`email already exist`,409))
    }
    next();
 
}