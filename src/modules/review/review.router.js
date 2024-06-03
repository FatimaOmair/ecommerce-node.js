import {Router} from 'express'
import fileUpload, { fileType } from '../../ults/multer.js';
import * as reviewController from './review.controller.js'
import { auth } from '../../middleware/auth.js';
import { endPoint } from './review.role.js';
const router= Router({mergeParams:true});

router.post('/',auth(endPoint.create),fileUpload(fileType.image).single('image'),reviewController.create)




export default router;