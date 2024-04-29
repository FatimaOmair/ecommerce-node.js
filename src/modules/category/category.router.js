import {Router} from 'express'
import * as categoryController from './category.controller.js'
import fileUpload, { fileType } from '../../ults/multer.js';
const router= Router();

router.post('/',fileUpload(fileType.image).single('image'), categoryController.create);
router.get('/',categoryController.getAll)

export default router;