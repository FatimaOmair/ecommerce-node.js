import {Router} from 'express'
import * as authController from './auth.controller.js'
import fileUpload, { fileType } from '../../ults/multer.js';
const router= Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.patch('/sendCode', authController.sendCode);
router.patch('/forgetPassword', authController.forgetPassword);



export default router;