import cartModel from "../../../db/model/cart.model.js";
import couponModel from "../../../db/model/coupon.model.js";

export const create = async (req, res) => {
    try {

        const cart = await cartModel.findOne({userId:req.user._id})

        if(!cart){
    return res.status(400).json("cart is empty")

        }

        if(req.body.couponId){
            const coupon = await couponModel.findById(req.body.couponId)
            if(!coupon){
                return res.status(400).json("coupont not found")  
            }
            if(coupon.expireDate < new Date()){
                return res.status(400).json("coupont is expired")  
            }
            if(coupon.usedBy.includes(req.user._id)){
                return res.status(400).json("coupont already used")  
            }

            req.body.coupon =coupon;
        }
        return res.status(201).json({message:"success",cart})
       
    } catch (error) {
        console.error("Error creating category:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


