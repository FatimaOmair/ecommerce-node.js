import couponModel from "../../../db/model/coupon.model.js";

export const create = async (req, res) => {
    try {

        if(await couponModel.findOne({name:req.body.name})){
            return res.status(404).json({message:"coupon name already exist"})
        }

        req.body.expireDate= new Date(req.body.expireDate)

    const coupon= await couponModel.create(req.body)

        return res.status(201).json({message:"success",coupon})
       
    } catch (error) {
        console.error("Error creating category:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


