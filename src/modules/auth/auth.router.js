import {Router} from 'express'
import * as authController from './auth.controller.js'
import fileUpload, { fileType } from '../../ults/multer.js';
import { checkEmail } from '../../middleware/checkEmail.js';
import { asyncHandler } from '../../ults/catchError.js';
import * as schema from './auth.validation.js';
import { validation } from '../../middleware/validation.js';
const router= Router();




router.post('/register',validation(schema.registerSchema),checkEmail, asyncHandler(authController.register));
router.post('/Excel',fileUpload(fileType.excel).single('excel'),asyncHandler(authController.addUserExcel))
router.post('/login',validation(schema.loginSchema), asyncHandler(authController.login));
router.patch('/sendCode',validation(schema.sendCode), asyncHandler(authController.sendCode));
router.patch('/forgetPassword',validation(schema.forgotPasswordSchema), asyncHandler(authController.forgetPassword));
router.get('/confirmEmail/:token',asyncHandler(authController.confirmEmail))


export default router;