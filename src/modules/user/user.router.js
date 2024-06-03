import {Router} from 'express'
import * as userController from './user.controller.js'
import { auth, roles } from '../../middleware/auth.js';
import { endPoint } from './user.role.js';
const router= Router();


router.get('/',auth(endPoint.getUsers),userController.getUsers)
router.get('/getData',auth(endPoint.getUserData),userController.getUserData)
export default router;