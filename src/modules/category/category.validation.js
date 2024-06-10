import Joi from 'joi';

export const deleteCategorySchema = Joi.object({
    id: Joi.string().hex().length(24),
   
 })

 export const createCategorySchema = Joi.object({
    name: Joi.string().hex().length(24),
    image:Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid('image/png','image/jpeg','image/webp').required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),
        size:Joi.number().max(5000000).required()
    }).required(),
 })

 export const updateCategorySchema = Joi.object({
    id: Joi.string().hex().length(24),
    name: Joi.string().min(3),
    status:Joi.string().valid('Active','NotActive'),
    image:Joi.object({
        fieldname:Joi.string().required(),
        originalname:Joi.string().required(),
        encoding:Joi.string().required(),
        mimetype:Joi.string().valid('image/png','image/jpeg','image/webp').required(),
        destination:Joi.string().required(),
        filename:Joi.string().required(),
        path:Joi.string().required(),
        size:Joi.number().max(5000000).required()
    }).optional()
   
 })

 export const getDetailsCategorySchema = Joi.object({
    id: Joi.string().hex().length(24),
   
 })