const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  splitMethod: { type: String, enum: ['exact', 'percentage', 'equal'], required: true },
  details: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    share: { type: Number, required: true },
  }],
});

module.exports = mongoose.model('Expense', ExpenseSchema);
