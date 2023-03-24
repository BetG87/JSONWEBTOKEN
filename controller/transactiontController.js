const Transaction = require('../models/TransactionSchema')
const BankAccount = require('../models/BankAccount')

const transactionController = {
    addBankAccount: async (req, res) => {
        try {
            console.log('1')
            const newtransaction = new Transaction(req.body);

            const savedTransaction = await newtransaction.save();
            if (req.body.user) {
                const bankaccount = BankAccount.findById(req.body.bankAccount);
                await bankaccount.updateOne({ $push: { bankAccount: savedTransaction._id } })
            }
            return res.status(200).json(savedTransaction);
        } catch (err) {
            return res.status(500).json(err); //HTTP REQUEST CODE
        }
    },
    getAllBankAccount: async (req, res) => {
        try {
            const bankAccount = await Transaction.find();
            return res.status(200).json(bankAccount)
        } catch (err) {
            return res.status(500).json(err); //HTTP REQUEST CODE
        }

    },
    getById: async (req, res) => {
        try {
            const transaction = await Transaction.findById(req.params.id).populate('bankAccount');
            return res.status(200).json(transaction);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    updateBankAccount: async (req, res) => {
        try {
            const transaction = await Transaction.findById(req.body._id);
            await transaction.updateOne({ $set: req.body });
            return res.status(200).json("Update successfully");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    deleteBankAccount: async (req, res) => {
        try {
            const transaction = await Transaction.findById(req.body._id);
            transaction.isActive = false
            transaction.save()
            return res.status(200).json("Delete successfully")
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
}

module.exports = transactionController;