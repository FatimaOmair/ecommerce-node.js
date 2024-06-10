import Joi from 'joi';

export const createCartSchema = Joi.object({
    productId: Joi.string().hex().length(24),
   
 })