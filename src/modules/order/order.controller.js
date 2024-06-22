import cartModel from "../../../db/model/cart.model.js";
import couponModel from "../../../db/model/coupon.model.js";
import orderModel from "../../../db/model/order.model.js";
import productModel from "../../../db/model/product.model.js";
import userModel from "../../../db/model/user.model.js";
import Stripe from "stripe";


const stripe=new Stripe('sk_test_51PQkLGE32qRADTS19pXPEWuP0KpNfrxU5vSP8ysgy7y7LRgY9U0AiOmjDejRySziESmZnf2pMjwyPD6FuJZvSjnr00qiBUfKdw')
export const create = async (req, res) => {
    try {
        const { couponName } = req.body;

        const cart = await cartModel.findOne({ userId: req.user._id });

        if (!cart || cart.products.length === 0) {
            return res.status(400).json("Cart is empty");
        }

        req.body.products = cart.products;

        if (couponName) {
            const coupon = await couponModel.findOne({ name: couponName });

            if (!coupon) {
                return res.status(400).json("Coupon not found");
            }

            if (coupon.expireDate < new Date()) {
                return res.status(400).json("Coupon is expired");
            }

            if (Array.isArray(coupon.usedBy) && coupon.usedBy.includes(req.user._id)) {
                return res.status(400).json("Coupon already used");
            }

            req.body.coupon = coupon;
        }

        let finalProductList = [];
        let subTotal = 0;

        for (let product of req.body.products) {
            const checkProduct = await productModel.findOne({
                _id: product.productId,
                stock: { $gte: product.quantity }
            });

            if (!checkProduct) {
                return res.status(400).json("Product quantity not available");
            }

            product = product.toObject(); // Convert from BSON to JS object
            product.productName = checkProduct.name;
            product.discount = checkProduct.discount;
            product.unityPrice = checkProduct.price; // Corrected key name
            product.finalPrice = product.quantity * product.unityPrice; // Corrected calculation
            subTotal += product.finalPrice;

            finalProductList.push(product);
        }

        const user = await userModel.findById(req.user._id);

        if (!req.body.address) {
            req.body.address = user.address;
        }
        if (!req.body.phoneNumber) {
            req.body.phoneNumber = user.phoneNumber;
        }
         
        const session = await stripe.checkout.sessions.create({
            line_items:[
                {
                    price_data:{
                      currency:'USD',
                      unit_amount:subTotal - (subTotal * ((req.body.coupon?.amount || 0)) / 100) ,
                      product_data: {name:user.userName}
                    },
                    quantity:1
                }
            ],
            mode:'payment',
            success_url:"www.facebook.com",
            cancel_url:'wwww.facebook.com'
        })

        const order = await orderModel.create({
            userId: req.user._id,
            products: finalProductList,
            finalPrice: subTotal - (subTotal * ((req.body.coupon?.amount || 0)) / 100),
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            UpdatedBy: req.user._id
        });

        if (order) {


const invoice = {
  shipping: {
    name: user.userName,
    address: order.address,
    phone:order.phoneNumber
    
  },
  items:order.products,
  subtotal: order.finalPrice,
  invoice_nr: order._id
};

createInvoice(invoice, "invoice.pdf");



            for (const product of req.body.products) {
                await productModel.findOneAndUpdate(
                    { _id: product.productId },
                    { $inc: { stock: -product.quantity } }
                );
            }

            if (req.body.coupon) {
                await couponModel.findByIdAndUpdate(
                    { _id: req.body.coupon._id },
                    { $addToSet: { usedBy: req.user._id } }
                );
            }

            await cartModel.updateOne({ userId: req.user._id }, {
                products: []
            });
        }

        return res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const getOrders=async(req,res,next)=>{
const order= await orderModel.find(
    {
       $or:[
        {
         status:'pending'   
        },
        {
            status:'confirmed'
        }
       ]
    }
);
return res.json({message:'success',order})
}

export const myOrders=async(req,res,next)=>{
const orders = await orderModel.find({userId:req.user._id});
return res.json({message:'success',orders})
}

export const changeStatus=async(req,res,next)=>{
   const {orderId}= req.params;
   const {status}=req.body
   const order = await orderModel.findById(orderId)
   if(!order){
    return res.json({message:"order not found"})
   }
  order.status=status;
  await order.save()
  return res.json({message:"success",order})

}



