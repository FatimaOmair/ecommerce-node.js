import mongoose, { Schema, Types, model } from "mongoose";

const productSchema =new Schema({
   name:{
    type:String,
    required:true,
    unique:true,
    trim:true
    
   },
  

   slug:{
    type:String,
    required:true,
   },
   discription:{
    type:String,
    required:true
   },
   status:{
    type:String,
    default:'Active',
    enum:['Active','NotActive']
   },

   stock:{
    type:Number,
    default:1
   },

   discount:{
    type:Number,
    default:0
   },

   finalPrice:{
    type:Number
   },

   mainImage:[{
     type:Object,
     required:true
   }],

   subImages:{
    type:Object,
    required:true
  },
   
  sizes:[{
   type:String,
   enum:['s','m','lg','xl']
  }],

  colors:[String],


   categoryId:{
     type:Types.ObjectId,
     ref:'Categotry',
     required:true
   },

   subCategoryId:{
    type:Types.ObjectId,
    ref:'SubCategotry',
    required:true
  },

   price:{
    type:Number,
    required:true
   },

   createdBy:{
    type:Types.ObjectId,
    ref:'User',
 
   },
   UpdatedBy:{
    type:Types.ObjectId,
    ref:'User',
 
   }
},{timestamps:true,
   toJSON:{virtuals:true},
   toObject:{virtuals:true}
},
)

productSchema.virtual('reviews',{
  ref:"Review",
  localField:"_id",
  foreignField:"productId"
})



const productModel=model('Product',productSchema)
export default productModel;