import slugify from "slugify";
import categoryModel from "../../../db/model/category.model.js";
import cloudinary from "../../ults/cloudinary.js";

export const create = async (req, res) => {
    try {
        const name = req.body.name.toLowerCase();

        if (await categoryModel.findOne({ name })) {
            return res.status(409).json({ message: "Category already exists" });
        }

        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APPNAME}/categories` });

        const createdBy = req.user._id;
        const UpdatedBy = req.user._id;

        const slug = slugify(name);

        const category = await categoryModel.create({
            name,
            slug,
            image: { secure_url, public_id },
            createdBy, 
            UpdatedBy
        });

        return res.json({ message: category });
    } catch (error) {
        console.error("Error creating category:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const getAll=async(req,res)=>{
    const categories= await categoryModel.find({}).populate([{path:"createdBy",select:"userName"},{path:"UpdatedBy",select:"userName"},{path:"subCategory"}]) 
    return res.status(200).json({message:"success",categories})
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
            const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APPNAME}/categories` });
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

