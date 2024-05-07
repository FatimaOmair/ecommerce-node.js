import {Router} from 'express'
import * as subCategoryController from './subCategory.controller.js'
import fileUpload, { fileType } from '../../ults/multer.js';
import { auth } from '../../middleware/auth.js';
const router= Router({mergeParams:true});

router.post('/',auth(),fileUpload(fileType.image).single('image'), subCategoryController.create);
router.get('/',subCategoryController.getAll)
router.get('/active',subCategoryController.getActive)
router.get('/:id',subCategoryController.getCategory)
router.patch('/:id',auth(),fileUpload(fileType.image).single('image'),subCategoryController.updateCategory)
router.delete('/:id',subCategoryController.deleteCategory)

router.get('/name/:name',subCategoryController.getName)

export default router;