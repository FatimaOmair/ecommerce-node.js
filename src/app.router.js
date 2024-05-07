import connectDB from '../db/connection.js'
import categoriesRouter from './modules/category/category.router.js'
import subCategoriesRouter from './modules/subCategory/subCategory.router.js'

import productsRouter from './modules/product/product.router.js'
import authRouter from './modules/auth/auth.router.js'

import cors from 'cors'
const initApp=(app,express)=>{
    connectDB()
    app.use(cors())
     app.use(express.json())
     app.get('/',(req,res)=>{
        return res.status(200).json({message:"success"})
     })
    app.use('/categories',categoriesRouter)
    app.use('/subCategories',subCategoriesRouter)
    app.use('/auth',authRouter)
    app.use(productsRouter)

    app.use('*',(req,res)=>{
      return res.status(404).json({message:'page not found'})
    })

}

export default initApp;