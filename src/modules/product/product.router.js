import {Router} from 'express'
import fileUpload, { fileType } from '../../ults/multer.js';
import * as productController from './product.controller.js'
import { auth } from '../../middleware/auth.js';
import { endPoint } from './product.roles.js';
import reviewRouter from './../review/review.router.js'
import { validation } from '../../middleware/validation.js';
import * as schema from './product.validation.js'
const router= Router();
router.use('/:productId/review',reviewRouter)

router.get('/products',(req,res)=>{
    return res.json({message:"product"})
})


router.post('/createProduct',fileUpload(fileType.image).fields(
    [
        {name:'image',maxCount:1},
        {name:'subImages',maxCount:5}
    ]
),validation(schema.createProductSchema),auth(endPoint.create),productController.createProduct)

router.get('/',productController.getProducts)

export default router;