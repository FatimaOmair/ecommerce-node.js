import userModel from "../../../db/model/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const register=async(req, res, next) =>{
   const {userName,email,password} = req.body;
   const user= await userModel.findOne({email})
   
   if(user){
    return res.status(409).json({meessage:"email already in use"})
   }

   const hashedPassword= bcrypt.hashSync(password,parseInt(process.env.SALTROUND))
   const createUser= await userModel.create({userName,email,password:hashedPassword})
   return res.status(201).json({meessage:"success",user:createUser})

}

export const login=async(req,res,next)=>{
   const {email,password}=req.body;
   const user= await userModel.findOne({email})

   if(!user){
      return res.status(400).json({message:"invalid data"})
   }

   const match=await bcrypt.compare(password,user.password)
   if(user.status=='NOtActive'){

    return res.status(400).json({message:"Your account is blocked"})
   }
   if(!match){
    return res.status(400).json({message:"invalid password"})
   }
   const token =jwt.sign({id:user._id,role:user.role,status:user.status},process.env.LOGINSIGN)

   return res.json({message:"success",token})
}