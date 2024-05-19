import mongoose, { Schema, Types, model } from "mongoose";

const orderSchema =new Schema({
   userId:{
    type:Types.ObjectId,
    ref:'User',
    required:true
    
   },
   products:[{
    productId:{
        type:Types.ObjectId,
        ref:'Product' ,
        required:true 
    },
    quantity:{
        type:Number,
        default:1,
        required:true
      },
      unityPrice:{
       type:Number,
       required:true
      },
   
      finalPrice:{
       type:Number,
       required:true
      },
   }],

   finalPrice:{
    type:Number,
    required:true
   },

   address:{
    type:String,
    required:true
   },

   phoneNumber:{
    type:String,
    required:true
   },

   paymentType:{
    type:String,
    default:'cash',
    enum:['cash','cart']
   },
  
   status:{
    type:String,
    default:'pending',
    enum:['pending','cancelled','confirmed','onway','deliverd']
   },

   notes:{
    type:String,
   },

   rejectedReason:{
    type:String,
   },
 
   UpdatedBy:{
    type:Types.ObjectId,
    ref:'User',
    required:true
 
   },
   couponId:{
    type:Types.ObjectId,
    ref:'Coupon'
   }
},{timestamps:true,
   
},
)


const orderModel=model('Order',orderSchema)
export default orderModel;