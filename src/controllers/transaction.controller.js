const transactionService = require('../services/transaction.service');
const User = require('../models/User');

/* =======================
   CREATE TRANSACTION
======================= */
const createTransaction = async (req, res) => {
  try {
    const result = await transactionService.createTransaction(
      req.userId,
      req.body
    );

    res.status(result.status).json(result.body);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message,
    });
  }
};

/* =======================
   SET BUDGET
======================= */
const setBudget = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.budget = req.body.budget;
    await user.save();

    return res.status(200).json({
      message: 'Budget set successfully',
      budget: user.budget,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/* =======================
   GET ALL TRANSACTIONS
======================= */
const getTransactions = async (req, res) => {
  try {
    const result = await transactionService.getTransactions(
      req.userId,
      req.query
    );

    return res.status(result.status).json(result.body);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message,
    });
  }
};

/* =======================
   GET TRANSACTION BY ID
======================= */
const getTransactionById = async (req, res) => {
  try {
    const result = await transactionService.getTransactionById(
      req.userId,
      req.params.id
    );

    return res.status(result.status).json(result.body);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message,
    });
  }
};

/* =======================
   UPDATE TRANSACTION
======================= */
const updateTransaction = async (req, res) => {
  try {
    const result = await transactionService.updateTransaction(
      req.userId,
      req.params.id,
      req.body
    );

    return res.status(result.status).json(result.body);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message,
    });
  }
};

/* =======================
   DELETE TRANSACTION
======================= */
const deleteTransaction = async (req, res) => {
  try {
    const result = await transactionService.deleteTransaction(
      req.userId,
      req.params.id
    );

    return res.status(result.status).json(result.body);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message,
    });
  }
};

/* =======================
   GET SUMMARY
======================= */
const getSummary = async (req, res) => {
  try {
    const result = await transactionService.getSummary(
      req.userId,
      req.query
    );

    return res.status(result.status).json(result.body);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTransaction,
  setBudget,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummary,
};