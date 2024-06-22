import Joi from 'joi';


 export const createCouponSchema = Joi.object({
    name: Joi.string().min(3).required(),
    amount:Joi.number().integer().min(1).max(50).optional(),
    expireDate:Joi.date().greater('now')

 })

