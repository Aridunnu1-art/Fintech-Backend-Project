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
router.post('/', createTransaction);

// Get all transactions
router.get('/', getTransactions);

// Get single transaction
router.get('/:transactionId', getTransactionById);

// Update transaction
router.put('/:transactionId', updateTransaction);

// Delete transaction
router.delete('/:transactionId', deleteTransaction);

module.exports = router;
