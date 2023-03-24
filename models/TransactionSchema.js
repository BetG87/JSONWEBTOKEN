const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['deposit', 'withdrawal'],
    required: true,
  },
  bankAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BankAccount',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
  date: {
    type: Date,
    default: Date.now,
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
    },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
