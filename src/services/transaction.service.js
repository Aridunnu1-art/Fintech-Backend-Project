const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
const { transactionValidation } = require('../validator/validation');

const createError = (status, message, details = null) => {
  const error = new Error(message);
  error.status = status;
  if (details) error.details = details;
  return error;
};

const createTransaction = async (userId, body) => {
  const { error, value } = transactionValidation.create.validate(body);
  if (error) {
    throw createError(400, 'Validation error', error.details);
  }

  const { amount, type, category, description, date } = value;

  const transaction = new Transaction({
    userId,
    amount,
    type,
    category,
    description,
    date: date || new Date(),
  });

  await transaction.save();

  return {
    status: 201,
    body: {
      message: 'Transaction created successfully',
      transaction,
    },
  };
};

const getTransactions = async (userId, query) => {
  const { type, category, startDate, endDate } = query;
  const limit = parseInt(query.limit, 10) || 50;
  const page = parseInt(query.page, 10) || 1;

  const filter = { userId };
  if (type) filter.type = type;
  if (category) filter.category = category;

  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  const skip = (page - 1) * limit;

  const transactions = await Transaction.find(filter)
    .sort({ date: -1 })
    .limit(limit)
    .skip(skip);

  const total = await Transaction.countDocuments(filter);

  return {
    status: 200,
    body: {
      message: 'Transactions retrieved successfully',
      transactions,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    },
  };
};

const getTransactionById = async (userId, transactionId) => {
  const transaction = await Transaction.findOne({ _id: transactionId, userId });
  if (!transaction) {
    throw createError(404, 'Transaction not found');
  }

  return {
    status: 200,
    body: {
      message: 'Transaction retrieved successfully',
      transaction,
    },
  };
};

const updateTransaction = async (userId, transactionId, body) => {
  const { error, value } = transactionValidation.update.validate(body);
  if (error) {
    throw createError(400, 'Validation error', error.details);
  }

  const transaction = await Transaction.findOneAndUpdate(
    { _id: transactionId, userId },
    value,
    { new: true, runValidators: true }
  );

  if (!transaction) {
    throw createError(404, 'Transaction not found');
  }

  return {
    status: 200,
    body: {
      message: 'Transaction updated successfully',
      transaction,
    },
  };
};

const deleteTransaction = async (userId, transactionId) => {
  const transaction = await Transaction.findOneAndDelete({ _id: transactionId, userId });
  if (!transaction) {
    throw createError(404, 'Transaction not found');
  }

  return {
    status: 200,
    body: {
      message: 'Transaction deleted successfully',
      transaction,
    },
  };
};

const getSummary = async (userId, query) => {
  const { startDate, endDate } = query;

  const matchStage = { $match: { userId: mongoose.Types.ObjectId(userId) } };

  if (startDate || endDate) {
    matchStage.$match.date = {};
    if (startDate) matchStage.$match.date.$gte = new Date(startDate);
    if (endDate) matchStage.$match.date.$lte = new Date(endDate);
  }

  const summary = await Transaction.aggregate([
    matchStage,
    {
      $group: {
        _id: '$type',
        total: { $sum: '$amount' },
        count: { $sum: 1 },
      },
    },
  ]);

  let income = 0;
  let expenses = 0;

  summary.forEach((item) => {
    if (item._id === 'income') income = item.total;
    if (item._id === 'expense') expenses = item.total;
  });

  return {
    status: 200,
    body: {
      message: 'Summary retrieved successfully',
      summary: {
        income,
        expenses,
        balance: income - expenses,
      },
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
