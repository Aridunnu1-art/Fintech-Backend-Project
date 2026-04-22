const express = require('express');
const auth = require('../middleware/auth');
const { setBudget } = require('../controllers/user.controller');

const router = express.Router();

// set budget
router.put('/budget', auth, setBudget);

module.exports = router;