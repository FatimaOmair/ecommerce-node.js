import slugify from "slugify";
import categoryModel from "../../../db/model/category.model.js";
import cloudinary from "../../ults/cloudinary.js";
import subCategoryModel from "../../../db/model/subCategory.model.js";

export const create = async (req, res) => {
    try {
        const {categoryId}=req.body;
        const category= await categoryModel.findById(categoryId) 

        if(!category){
            return res.status(404).json({message: "SubCategory not found"})
        }
       
        req.body.name = req.body.name.toLowerCase();

        

        if (await subCategoryModel.findOne({ name:req.body.name })) {
            return res.status(409).json({ message: "SubCategory already exists" });
        }
        

        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APPNAME}/categories` });
        
        req.body.image={secure_url, public_id}
        const createdBy = req.user._id;
        const UpdatedBy = req.user._id;

        

        req.body.slug = slugify(req.body.name);
        

        const subcategory = await subCategoryModel.create( req.body );
   
        return res.json({ message:"success",subcategory  });
    } catch (error) {
        console.error("Error creating category:", error);
        return res.status(500).json({ message: "Internal server error",error });
    }
};


export const getAll=async(req,res)=>{
   const {id}=req.params
    const subCategories= await subCategoryModel.find({categoryId:id}) 
    return res.status(200).json({message:"success",subCategories})
}

export const getActive=async(req,res)=>{
    const categories= await categoryModel.find({status:'Active'}).select('name') 
    return res.status(200).json({message:"success",categories})
}

export const getCategory=async(req,res,next)=>{
   const category= await categoryModel.findById(req.params.id)
   return res.status(200).json({message:"success",category})
}

export const getName=async(req,res,next)=>{
    return res.status(200).json(req.params.name)
 }

 export const updateCategory = async (req, res, next) => {
    try {
        const category = await categoryModel.findById(req.params.id);
       
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        
        if (req.body.name) {
            category.name = req.body.name.toLowerCase();
            const existingCategory = await categoryModel.findOne({ name: req.body.name,_id:{$ne:req.params.id} });
            if (existingCategory) {
                return res.status(409).json({ message: "name already exists" });
            }
            category.slug = slugify(req.body.name);
        }

        if (req.file) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: "Fshop/categories" });
            cloudinary.uploader.destroy(category.image.public_id)
            category.image = { secure_url, public_id };
        }
        
        if (req.body.status) {
            category.status = req.body.status;
        }
        
        category.UpdatedBy=req.user._id
        await category.save();

        return res.status(200).json({ message: "Category updated successfully", category });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};
export const deleteCategory=async(req,res,next)=>{
    const category= await categoryModel.findByIdAndDelete(req.params.id)
    if (!category) {
        return res.status(404).json({ message: "Category not found" });

    }

    await cloudinary.uploader.destroy(category.image.public_id)
    return res.status(200).json({ message: "Category deleted successfully", category });

}

