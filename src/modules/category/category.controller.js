import slugify from "slugify";
import categoryModel from "../../../db/model/category.model.js";
import cloudinary from "../../ults/cloudinary.js";

export const create=async(req,res)=>{
    const name=req.body.name.toLowerCase();

    if(await categoryModel.findOne({name})){
        return res.status(409).json({message:"category alraedy existe"});
    }
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:"Fshop/categories"})
    const slug = slugify(name)
    const category= await categoryModel.create({name,slug,image:{secure_url:secure_url,public_id:public_id}})
    return res.json({message:category})
}

export const getAll=(req,res)=>{
    return res.json({message:"success"})
}