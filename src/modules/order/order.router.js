import {Router} from 'express'
import * as orderController from './order.controller.js'
import { auth, roles } from '../../middleware/auth.js';
import { endPoint } from './order.roles.js';
const router= Router();


router.post('/',auth(endPoint.create), orderController.create);
router.get('/getOrders',auth(endPoint.all),orderController.getOrders)
router.get('/myOrders',auth(endPoint.getOrder),orderController.myOrders)
router.patch('/changeStatus/:orderId',auth(endPoint.change),orderController.changeStatus)
export default router;