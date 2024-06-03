import userModel from "../../../db/model/user.model.js"

export const getUsers=async(req,res,next)=>{
const users = await userModel.find({})
return res.status(200).json({message:"success",users})
}


export const getUserData=async(req,res,next)=>{
  const user= await userModel.findById(req.user._id);
  return res.status(200).json({message:"success",user}) 
}

