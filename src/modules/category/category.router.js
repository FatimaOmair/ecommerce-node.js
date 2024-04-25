import {Router} from 'express'
import * as categoryController from './category.controller.js'
const router= Router();


router.get('/categories',categoryController.getAll)

export default router;