import mongoose, { Schema, Types, model } from "mongoose";

const categorySchema =new Schema({
   name:{
    type:String,
    required:true,
    
   },
   image:{
    type:Object,
    required:true,
   },
   slug:{
    type:String,
    required:true,
   },
   status:{
    type:String,
    default:'Active',
    enum:['Active','NotActive']
   },
   createdBy:{
    type:Types.ObjectId,
    ref:'User',
 
   },
   UpdatedBy:{
    type:Types.ObjectId,
    ref:'User',
 
   }
},{timestamps:true})

const categoryModel=model('Categotry',categorySchema)
export default categoryModel;