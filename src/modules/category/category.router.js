import {Router} from 'express'
import * as categoryController from './category.controller.js'
import fileUpload, { fileType } from '../../ults/multer.js';
import { auth, roles } from '../../middleware/auth.js';
import subCategoryRouter from './../subCategory/subCategory.router.js'
import { endPoint } from './category.roles.js';
const router= Router();


router.use('/:id/subCategory',subCategoryRouter)
router.post('/',auth(endPoint.create),fileUpload(fileType.image).single('image'), categoryController.create);
router.get('/',auth(endPoint.get),categoryController.getAll)
router.get('/active',auth(endPoint.get),categoryController.getActive)
router.get('/:id',auth(endPoint.get),categoryController.getCategory)
router.patch('/:id',auth(),fileUpload(fileType.image).single('image'),categoryController.updateCategory)
router.delete('/:id',auth(endPoint.delete),categoryController.deleteCategory)

router.get('/name/:name',categoryController.getName)

export default router;