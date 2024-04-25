import mongoose from "mongoose";

const connectDB=async(req,res)=>{
mongoose.connect(process.env.DB)
.then(()=>{
    console.log("connectDB")
}).catch((err)=>{
    console.log(`error to connectDB: ${err}`)
})
}

export default connectDB