import {Router} from 'express'
import * as categoryController from './category.controller.js'
import fileUpload, { fileType } from '../../ults/multer.js';
import { auth, roles } from '../../middleware/auth.js';
import subCategoryRouter from './../subCategory/subCategory.router.js'
import { endPoint } from './category.roles.js';
import { validation } from '../../middleware/validation.js';
import * as schema from './category.validation.js'
const router= Router();


router.use('/:id/subCategory',subCategoryRouter)
router.post('/',fileUpload(fileType.image).single('image'),validation(schema.createCategorySchema),auth(endPoint.create), categoryController.create);
router.get('/',auth(endPoint.get),categoryController.getAll)
router.get('/active',auth(endPoint.get),categoryController.getActive)
router.get('/:id',auth(endPoint.get),categoryController.getCategory)
router.patch('/:id',fileUpload(fileType.image).single('image'),validation(schema.updateCategorySchema),auth(),categoryController.updateCategory)
router.delete('/:id',validation(schema.deleteCategorySchema),auth(endPoint.delete),categoryController.deleteCategory)

router.get('/name/:name',categoryController.getName)

export default router;