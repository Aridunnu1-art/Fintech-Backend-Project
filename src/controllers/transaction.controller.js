const Transaction = require('../models/Transaction');
const { transactionValidation } = require('../validator/validation');

// Create Transaction
const createTransaction = async (req, res) => {
  try {
    // Validate input
    const { error, value } = transactionValidation.create.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Validation error', details: error.details });
    }

    const { amount, type, category, description, date } = value;
    const userId = req.userId;

    // Create new transaction
    const transaction = new Transaction({
      userId,
      amount,
      type,
      category,
      description,
      date: date || new Date(),
    });

    await transaction.save();

    res.status(201).json({
      message: 'Transaction created successfully',
      transaction,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get All Transactions for User
const getTransactions = async (req, res) => {
  try {
    const userId = req.userId;
    const { type, category, startDate, endDate, limit = 50, page = 1 } = req.query;

    // Build filter
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
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Transaction.countDocuments(filter);

    res.status(200).json({
      message: 'Transactions retrieved successfully',
      transactions,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Single Transaction
const getTransactionById = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const userId = req.userId;

    const transaction = await Transaction.findOne({ _id: transactionId, userId });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json({
      message: 'Transaction retrieved successfully',
      transaction,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update Transaction
const updateTransaction = async (req, res) => {
  try {
    // Validate input
    const { error, value } = transactionValidation.update.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Validation error', details: error.details });
    }

    const { transactionId } = req.params;
    const userId = req.userId;

    const transaction = await Transaction.findOneAndUpdate(
      { _id: transactionId, userId },
      value,
      { new: true, runValidators: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json({
      message: 'Transaction updated successfully',
      transaction,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete Transaction
const deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const userId = req.userId;

    const transaction = await Transaction.findOneAndDelete({ _id: transactionId, userId });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json({
      message: 'Transaction deleted successfully',
      transaction,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Summary (Income, Expenses, Balance)
const getSummary = async (req, res) => {
  try {
    const userId = req.userId;
    const { startDate, endDate } = req.query;

    const matchStage = { $match: { userId: require('mongoose').Types.ObjectId(userId) } };

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

    let income = 0,
      expenses = 0;

    summary.forEach((item) => {
      if (item._id === 'income') income = item.total;
      if (item._id === 'expense') expenses = item.total;
    });

    res.status(200).json({
      message: 'Summary retrieved successfully',
      summary: {
        income,
        expenses,
        balance: income - expenses,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummary,
};