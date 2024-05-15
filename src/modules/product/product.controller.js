import slugify from "slugify";
import categoryModel from "../../../db/model/category.model.js";
import subCategoryModel from "../../../db/model/subCategory.model.js";
import cloudinary from "../../ults/cloudinary.js";
import productModel from "../../../db/model/product.model.js";

export const createProduct=async(req,res,next)=>{
const {name,discount,price,categoryId,subCategoryId}=req.body;

const check= await categoryModel.findById(categoryId)

if(!check){
    return res.status(404).json({message:"category not found"})
}

const checkSub= await subCategoryModel.findOne({_id:subCategoryId,categoryId:categoryId})

if(!checkSub){
    return res.status(404).json({message:"Subcategory not found"})
}

req.body.slug= slugify(name)


let finalPrice=0;
if(discount==null){
  finalPrice=price;
}else{
    finalPrice=price-((price*discount)/100)
}

const {secure_url,public_id}= await cloudinary.uploader.upload(req.files.mainImage[0].path,{folder:`${process.env.APPNAME}/${name}`})
req.body.mainImage={secure_url,public_id}


req.body.subImages=[]
for(const file of req.files.subImages){
    const {secure_url,public_id}= await cloudinary.uploader.upload(req.files.mainImage[0].path,{folder:`${process.env.APPNAME}/${name}/subImages`})
    req.body.subImages.push({secure_url,public_id})
}

const product =await productModel.create(req.body)
return res.status(200).json({message:"success",product})
}