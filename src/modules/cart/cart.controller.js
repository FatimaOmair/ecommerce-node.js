import cartModel from "../../../db/model/cart.model.js";




export const create = async (req, res) => {
    try {
        const { productId } = req.body;

        const cart = await cartModel.findOne({ userId: req.user._id });

        if (!cart) {
            const newCart = await cartModel.create({
                userId: req.user._id,
                products: [{ productId }] // Create products array with the new productId
            });
            return res.json({ message: "success", cart: newCart });
        }

        for (let i = 0; i < cart.products.length; i++) {
            if (cart.products[i].productId == productId) {
                return res.status(400).json("Product already exists in the cart.");
            }
        }

        cart.products.push({ productId });
        await cart.save();

        return res.json({ message: "success", cart });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const destroy=async(req,res,next)=>{
  const {productId}=req.params
    const cart=await cartModel.findOneAndUpdate({userId:req.user._id},
        {
            $pull:{
                productId:productId
            }
        },{new:true}
    )
  return res.json({message:"success",cart})

}


export const clear=async(req,res,next)=>{

    const cart =await cartModel.findOneAndUpdate({

    userId:req.user._id
    },{
        products:[]
    },{
        new:true
    })

    return res.json({message:"success",cart})
}

export const getCart=async(req,res,next)=>{
   
    const cart =await cartModel.find({userId:req.user._id})
    return res.json({message:"success",cart})
}

export const increase=async(req,res,next)=>{
   const {quantity}=req.body
    const cart =await cartModel.findOneAndUpdate({userId:req.user._id,"products.productId":req.params.productId},
        {

           $inc:{
             "products.$.quantity":quantity
           } 
        },{new:true}
    )
    return res.json({message:"success",cart})
}

export const decrease=async(req,res,next)=>{
   
    const {quantity}=req.body
    const cart =await cartModel.findOneAndUpdate({userId:req.user._id,"products.productId":req.params.productId},
        {

           $inc:{
             "products.$.quantity":-quantity
           } 
        },{new:true}
    )
    return res.json({message:"success",cart})
}



