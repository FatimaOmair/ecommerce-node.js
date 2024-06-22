import userModel from "../../../db/model/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sendEmail from "../../ults/email.js";
import { customAlphabet, nanoid } from "nanoid";
import xlsx from "xlsx";



export const register=async(req, res, next) =>{
   
   const {userName,email,password} = req.body;
  
   const hashedPassword= bcrypt.hashSync(password,parseInt(process.env.SALTROUND))
   const createUser= await userModel.create({userName,email,password:hashedPassword})
   const token = jwt.sign({email},process.env.CONFIRMSIGN)

   
    await sendEmail(email,`welcome`,userName,token)
   return res.status(201).json({meessage:"success",user:createUser})

}

export const addUserExcel=async(req, res, next) =>{
const workbook = xlsx.readFile(req.file.path)
const worksheet = workbook.Sheets[workbook.SheetNames[0]]
const users=xlsx.utils.sheet_to_json(worksheet)
await userModel.insertMany(users)
return res.json(workbook)
}

export const confirmEmail=async(req, res, next) =>{
   const token= req.params.token;
   const decoded= jwt.verify(token,process.env.CONFIRMSIGN)
await userModel.findOneAndUpdate({email:req.params.email},{confirmEmail:true})
return res.status(200).json({message:"success"})
}

export const login=async(req,res,next)=>{
   const {email,password}=req.body;
   const user= await userModel.findOne({email})

   if(!user){
      return res.status(400).json({message:"invalid data"})
   }

   if(!user.confirmEmail){
      return res.json({message:"plz confiem your email"})
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

export const sendCode = async (req, res, next) => {
   const { email } = req.body;
 
   // Generate a random code
   const codeGenerator = customAlphabet('1234567890abcdef', 4);
   const code = codeGenerator();
 
   try {
     // Find user by email and update the sendCode field
     const user = await userModel.findOneAndUpdate(
       { email },
       { sendCode: code },
       { new: true }
     );
 
     // If user not found, return 404
     if (!user) {
       return res.status(404).json({ message: "Email not found" });
     }
 
     // Send email with the code
     await sendEmail(email, `Set Password`, `<h2>${code}</h2>`);
 
     // Return success message
     return res.json({ message: "Success" });
   } catch (error) {
     // Handle errors
     console.error("Error sending code:", error);
     return res.status(500).json({ message: "Internal server error" });
   }
 };
 

export const forgetPassword=async(req,res,next)=>{
   const {email,password,code} = req.body;
   const user=await userModel.findOne({email})
   if(!user){
      return res.status(404).json({message:"email not found"})
   }

   if(user.sendCode !=code){
      return res.status(400).json({message:"invalid code"})
 
   }

   user.password= await bcrypt.hash(password,parseInt(process.env.SALTROUND))
   user.sendCode=null
   await user.save()
   return res.status(200).json({message:"success"})
}