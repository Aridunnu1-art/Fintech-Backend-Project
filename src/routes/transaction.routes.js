const express = require('express');
const auth = require('../middleware/auth');
const {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummary,
} = require('../controllers/transaction.controller');

const router = express.Router();

// All transaction routes require authentication
router.use(auth);

// Get summary
router.get('/summary', getSummary);

// Create transaction
router.post('/transactions', createTransaction);

// Get all transactions
router.get('/transactions', getTransactions);

// Get single transaction
router.get('/transactions/:id', getTransactionById);

// Update transaction
router.put('/transactions/:id', updateTransaction);

// Delete transaction
router.delete('/transactions/:Id', deleteTransaction);

module.exports = router;
