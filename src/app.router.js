import connectDB from '../db/connection.js'
import categoriesRouter from './modules/category/category.router.js'
import subCategoriesRouter from './modules/subCategory/subCategory.router.js'
import productsRouter from './modules/product/product.router.js'
import authRouter from './modules/auth/auth.router.js'
import couponRouter from './modules/coupon/coupon.router.js'
import cartRouter from './modules/cart/cart.router.js'
import orderRouter from './modules/order/order.router.js'
import userRouter from './modules/user/user.router.js'
import reviewRouter from './modules/review/review.router.js'


import cors from 'cors'
const initApp=(app,express)=>{
    connectDB()
    app.use(cors())
     app.use(express.json())
     app.get('/',(req,res)=>{
        return res.status(200).json({message:"success"})
     })
    app.use('/categories',categoriesRouter)
    app.use('/product',productsRouter)
    app.use('/subCategories',subCategoriesRouter)
    app.use('/cart',cartRouter)
    app.use('/coupon',couponRouter)
    app.use('/auth',authRouter)
    app.use('/order',orderRouter)
    app.use('/user',userRouter)
    app.use('/review',reviewRouter)
    app.use(productsRouter)

    app.use('*',(req,res)=>{
      return res.status(404).json({message:'page not found'})
    })

}

export default initApp;