const Expense = require('../models/Expense');
const User = require('../models/User');
const splitExpense = require('../utils/splitExpense');

exports.addExpense = async (req, res) => {
  try {
    const { description, amount, splitMethod, details } = req.body;
    const calculatedDetails = splitExpense(amount, splitMethod, details);
    const expense = new Expense({ description, amount, splitMethod, details: calculatedDetails });
    await expense.save();
    res.status(201).json({ message: 'Expense added successfully', expense });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ 'details.userId': req.params.userId }).populate('details.userId');
    res.status(200).json(expenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate('details.userId');
    res.status(200).json(expenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.downloadBalanceSheet = async (req, res) => {
    try {
      // Fetch expenses from the database
      const expenses = await Expense.find().populate('details.userId');
  
      // Prepare data for the Excel sheet
      const data = [];
  
      // Header Row
      data.push(['Description', 'Amount', 'Date', 'User', 'Share']);
  
      expenses.forEach(expense => {
        expense.details.forEach(detail => {
          data.push([
            expense.description,
            expense.amount,
            expense.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
            detail.userId.name,
            detail.share
          ]);
        });
      });
  
      // Create a new workbook and add the data
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Balance Sheet');
  
      // Convert workbook to buffer
      const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
  
      // Set headers and send the file
      res.setHeader('Content-Disposition', 'attachment; filename=balance_sheet.xlsx');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.send(buffer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };