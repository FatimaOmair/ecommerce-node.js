import {Router} from 'express'
import * as cartController from './cart.controller.js'
import { auth, roles } from '../../middleware/auth.js';
import { endPoint } from './cart.roles.js';
import { validation } from '../../middleware/validation.js';
import * as schema from './cart.validation.js'
const router= Router();


router.get('/',validation(schema.createCartSchema),auth(endPoint.create), cartController.getCart);
router.post('/',auth(endPoint.create), cartController.create);
router.put('/increase/:productId',auth(endPoint.create), cartController.increase)
router.put('/decrease/:productId',auth(endPoint.create), cartController.decrease)
router.put('/clear',auth(endPoint.destroy), cartController.clear)
router.put('/:productId',auth(endPoint.destroy), cartController.destroy)

export default router;