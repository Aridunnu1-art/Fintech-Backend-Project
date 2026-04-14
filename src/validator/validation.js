const Joi = require('joi');

// User validation schemas
const userValidation = {
  register: Joi.object({
    name: Joi.string().min(2).required(),
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
    amount: Joi.number().min(0).required(),
    type: Joi.string().valid('income', 'expense').required(),
    category: Joi.string().required(),
    description: Joi.string().optional(),
    date: Joi.date().optional(),
  }),

  update: Joi.object({
    amount: Joi.number().min(0).optional(),
    type: Joi.string().valid('income', 'expense').optional(),
    category: Joi.string().optional(),
    description: Joi.string().optional(),
    date: Joi.date().optional(),
  }),
};

module.exports = {
  userValidation,
  transactionValidation,
};
