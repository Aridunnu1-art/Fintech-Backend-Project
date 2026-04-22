const Joi = require('joi');

// User validation schemas
const userValidation = {
  register: Joi.object({
    name: Joi.string().trim().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

// Transaction validation schemas
const transactionValidation = {
  create: Joi.object({
    amount: Joi.number().min(0.01).required(),
    type: Joi.string().valid('income', 'expense').required(),
    category: Joi.string().trim().min(2).required(),
    description: Joi.string().allow('').optional(),
    date: Joi.date().optional(),
  }),

  update: Joi.object({
    amount: Joi.number().min(0.01),
    type: Joi.string().valid('income', 'expense'),
    category: Joi.string().trim().min(2),
    description: Joi.string().allow('').optional(),
    date: Joi.date(),
  }).min(1),
};

module.exports = {
  userValidation,
  transactionValidation,
};