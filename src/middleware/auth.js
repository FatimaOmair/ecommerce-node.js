import userModel from "../../db/model/user.model.js";
import jwt from 'jsonwebtoken'


export const roles={
    Admin:'Admin',
    User:'User',
}


export const auth =(accessRole =[])=>{
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

        const user= await userModel.findById(decoded.id).select('userName role')
       
    console.log(user)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }

        if(!accessRole.includes(user.role)){
            return res.status(403).json({message:"not auth"})

          
        }

        
        req.user=user
        return next()
        

        
    
    }
}


