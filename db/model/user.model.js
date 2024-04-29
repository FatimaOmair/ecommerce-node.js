import mongoose, { Schema, model } from "mongoose";

const userSchema =new Schema({
   userName:{
    type:String,
    required:true,
    min:4,
    max:20
   },
   email:{
    type:String,
    required:true,
    unique:true
   },
   password:{
     type:String,
     required:true,
   },
   image:{
    type:Object,
   },
   phone:{
    type:String,
   },
   address:{
    type:String,
   },
   confirmEmail:{
    type:Boolean,
    default:false
   },
   gender:{
    type:String,
    enum:['Male','Female']
   },
   status:{
    type:String,
    default:'Active',
    enum:['Active','NotActive']
   },
   role:{
    type:String,
    default:'User',
    enum:['User','Admin']
   }
},{timestamps:true})

const userModel=model('User',userSchema)
export default userModel;