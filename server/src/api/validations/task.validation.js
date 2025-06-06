import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow(''),
  status: Joi.string().valid('pending', 'in_progress', 'completed').default('pending'),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().allow(''),
  status: Joi.string().valid('pending', 'in_progress', 'completed'),
});
