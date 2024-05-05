import {Router} from 'express'
import * as categoryController from './category.controller.js'
import fileUpload, { fileType } from '../../ults/multer.js';
import { auth } from '../../middleware/auth.js';
const router= Router();

router.post('/',auth(),fileUpload(fileType.image).single('image'), categoryController.create);
router.get('/',categoryController.getAll)
router.get('/active',categoryController.getActive)
router.get('/:id',categoryController.getCategory)
router.patch('/:id',auth(),fileUpload(fileType.image).single('image'),categoryController.updateCategory)
router.delete('/:id',categoryController.deleteCategory)

router.get('/name/:name',categoryController.getName)

export default router;