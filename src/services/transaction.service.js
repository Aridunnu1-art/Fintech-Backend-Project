const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { transactionValidation } = require('../validator/validation');

const createError = (status, message, details = null) => {
  const error = new Error(message);
  error.status = status;
  if (details) error.details = details;
  return error;
};

/* =======================
   CREATE TRANSACTION
======================= */
const createTransaction = async (userId, body) => {
  const { error, value } = transactionValidation.create.validate(body);

  if (error) throw createError(400, 'Validation error', error.details);

  const { amount, type, category, description, date } = value;

  const transaction = await Transaction.create({
    userId,
    amount,
    type,
    category,
    description,
    date: date || new Date(),
  });

  const user = await User.findById(userId);

  if (type === 'income') user.balance += amount;
  else user.balance -= amount;

  await user.save();

  return {
    status: 201,
    body: {
      message: 'Transaction created successfully',
      balance: user.balance,
      transaction,
    },
  };
};

/* =======================
   GET ALL TRANSACTIONS
======================= */
const getTransactions = async (userId) => {
  const transactions = await Transaction.find({ userId });

  return {
    status: 200,
    body: {
      message: 'Transactions fetched successfully',
      transactions,
    },
  };
};

/* =======================
   GET ONE
======================= */
const getTransactionById = async (userId, id) => {
  const transaction = await Transaction.findOne({ _id: id, userId });

  if (!transaction) throw createError(404, 'Transaction not found');

  return {
    status: 200,
    body: {
      message: 'Transaction fetched successfully',
      transaction,
    },
  };
};

/* =======================
   UPDATE
======================= */
const updateTransaction = async (userId, id, body) => {
  const transaction = await Transaction.findOneAndUpdate(
    { _id: id, userId },
    body,
    { new: true }
  );

  if (!transaction) throw createError(404, 'Transaction not found');

  return {
    status: 200,
    body: {
      message: 'Updated successfully',
      transaction,
    },
  };
};

/* =======================
   DELETE
======================= */
const deleteTransaction = async (userId, id) => {
  const transaction = await Transaction.findOneAndDelete({
    _id: id,
    userId,
  });

  if (!transaction) throw createError(404, 'Transaction not found');

  return {
    status: 200,
    body: {
      message: 'Deleted successfully',
    },
  };
};

/* =======================
   SUMMARY
======================= */
const getSummary = async (userId) => {
  const transactions = await Transaction.find({ userId });

  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    status: 200,
    body: {
      income,
      expense,
      balance: income - expense,
    },
  };
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummary,
};