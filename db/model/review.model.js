import mongoose, { Schema, Types, model } from "mongoose";

const reviewSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true

    },
    comment:{
      type:String,
      required:true
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
      },
      image:{
        type:Object
      },

  
        productId: {
            type: Types.ObjectId,
            ref: 'Product',
            required: true
        },

       




}, {
    timestamps: true,

},
)


const reviewModel = model('Review', reviewSchema)
export default reviewModel;