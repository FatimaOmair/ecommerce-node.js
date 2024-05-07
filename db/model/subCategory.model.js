import mongoose, { Schema, Types, model } from "mongoose";

const subCategorySchema =new Schema({
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
 
   },
   categoryId:{
    type:Types.ObjectId,
    ref:'Category',
    required:true,
   }
},{timestamps:true})

const subCategoryModel=model('SubCategotry',subCategorySchema)
export default subCategoryModel;