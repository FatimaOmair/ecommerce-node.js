import userModel from "../../db/model/user.model.js";
import jwt from 'jsonwebtoken'
export const auth =()=>{
    return async(req,res,next)=>{
     
        const {authorization}=req.headers;
       
        if(!authorization?.startsWith(process.env.BearerToken)){
            return res.status(400).json({message:"invalid token"})
        }

        const token =authorization.split(process.env.BearerToken)[1];
        
        const decoded =jwt.verify(token,process.env.LOGINSIGN)
    
       
        if(!decoded){
            return res.status(400).json({message:"invalid token"})
        }

        const user= await userModel.findById(decoded.id).select('userName')
    console.log(user)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }

        req.user=user
        next()
      
    
    }
}


