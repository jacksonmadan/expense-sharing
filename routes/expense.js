const express = require('express');
const router = express.Router();
const ExpenseController = require('../controllers/expenseController');

router.post('/', ExpenseController.addExpense);
router.get('/user/:userId', ExpenseController.getUserExpenses);
router.get('/', ExpenseController.getAllExpenses);
router.get('/balance-sheet', ExpenseController.downloadBalanceSheet);

module.exports = router;
