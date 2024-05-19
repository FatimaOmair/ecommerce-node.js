import {Router} from 'express'
import * as orderController from './order.controller.js'
import { auth, roles } from '../../middleware/auth.js';
import { endPoint } from './order.roles.js';
const router= Router();


router.post('/',auth(endPoint.create), orderController.create);

export default router;