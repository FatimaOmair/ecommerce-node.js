import slugify from "slugify";
import categoryModel from "../../../db/model/category.model.js";
import subCategoryModel from "../../../db/model/subCategory.model.js";
import cloudinary from "../../ults/cloudinary.js";
import productModel from "../../../db/model/product.model.js";
import { pagination } from "../../ults/pagination.js";

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

if (req.files.subImages){


for(const file of req.files.subImages){
    const {secure_url,public_id}= await cloudinary.uploader.upload(req.files.mainImage[0].path,{folder:`${process.env.APPNAME}/${name}/subImages`})
    req.body.subImages.push({secure_url,public_id})
}}

const product =await productModel.create(req.body)
return res.status(200).json({message:"success",product})
}


export const getProducts = async (req, res, next) => {
    try {
        const { page = 1, limit = 2, sort, search, fields } = req.query;
        const { skip, limit: parsedLimit } = pagination(page, limit);

        let queryObject = { ...req.query };
        const excludeQuery = ['page', 'limit', 'sort', 'search', 'fields'];

        excludeQuery.forEach((ele) => {
            delete queryObject[ele];
        });

        queryObject = JSON.stringify(queryObject);
        queryObject = queryObject.replace(/\b(gt|gte|lt|lte|in|nin|eq)\b/g, (match) => `$${match}`);
        queryObject = JSON.parse(queryObject);

        let productsQuery = productModel.find(queryObject)
            .skip(skip)
            .limit(parsedLimit)
            .populate({
                path: 'reviews',
                populate: {
                    path: 'userId',
                    select: 'userId -_id'
                }
            });

        if (fields) {
            const fieldsArray = fields.split(',').map(field => field.trim()).join(' ');
            productsQuery = productsQuery.select(fieldsArray);
        }

        if (search) {
            const searchRegex = new RegExp(search, 'i'); 
            productsQuery = productsQuery.find({
                $or: [
                    { name: { $regex: searchRegex } },
                    { description: { $regex: searchRegex } }
                ]
            });
        }

        if (sort) {
            const sortFields = sort.split(',').map(field => field.trim()).join(' ');
            productsQuery = productsQuery.sort(sortFields);
        } else {
            productsQuery = productsQuery.sort('createdAt'); 
        }

        const products = await productsQuery;
        const transformedProducts = products.map(product => ({
            ...product.toObject(),
            mainImage: product.mainImage.secure_url,
            subImages: product.subImages.map(img => img.secure_url)
        }));

        return res.status(200).json({ message: "success", products: transformedProducts });
    } catch (error) {
        next(error);
    }
};
