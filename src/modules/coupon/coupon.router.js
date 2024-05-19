import {Router} from 'express'
import * as couponController from './coupon.controller.js'
import { auth, roles } from '../../middleware/auth.js';
import { endPoint } from './coupon.roles.js';
const router= Router();


router.post('/',auth(endPoint.create), couponController.create);

export default router;