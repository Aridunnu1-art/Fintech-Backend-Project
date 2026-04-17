const transactionService = require('../services/transaction.service');

const createTransaction = async (req, res) => {
  try {
    const result = await transactionService.createTransaction(req.userId, req.body);
    res.status(result.status).json(result.body);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, ...(error.details ? { details: error.details } : { error: error.message }) });
  }
};

const getTransactions = async (req, res) => {
  try {
    const result = await transactionService.getTransactions(req.userId, req.query);
    res.status(result.status).json(result.body);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, error: error.message });
  }
};

const getTransactionById = async (req, res) => {
  try {
    const result = await transactionService.getTransactionById(req.userId, req.params.transactionId);
    res.status(result.status).json(result.body);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, error: error.message });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const result = await transactionService.updateTransaction(req.userId, req.params.transactionId, req.body);
    res.status(result.status).json(result.body);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, ...(error.details ? { details: error.details } : { error: error.message }) });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const result = await transactionService.deleteTransaction(req.userId, req.params.transactionId);
    res.status(result.status).json(result.body);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, error: error.message });
  }
};

const getSummary = async (req, res) => {
  try {
    const result = await transactionService.getSummary(req.userId, req.query);
    res.status(result.status).json(result.body);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, error: error.message });
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
