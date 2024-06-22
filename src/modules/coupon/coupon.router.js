import {Router} from 'express'
import * as couponController from './coupon.controller.js'
import { auth, roles } from '../../middleware/auth.js';
import { endPoint } from './coupon.roles.js';
import { validation } from '../../middleware/validation.js';
import * as schema from './coupon.validation.js'
const router= Router();


router.post('/',validation(schema.createCouponSchema),auth(endPoint.create), couponController.create);

export default router;