const BankAccount = require('../models/BankAccount')
const User = require('../models/User')

const bankAccountController = {
    addBankAccount: async (req, res) => {
        try {
            console.log('1')
            const newBankAccount = new BankAccount(req.body);

            const savedBankAccount = await newBankAccount.save();
            if (req.body.user) {
                const user = User.findById(req.body.user);
                await user.updateOne({ $push: { bankAccounts: savedBankAccount._id } })
            }
            return res.status(200).json(savedBankAccount);
        } catch (err) {
            return res.status(500).json(err); //HTTP REQUEST CODE
        }
    },
    getAllBankAccount: async (req, res) => {
        try {
            const bankAccount = await BankAccount.find();
            return res.status(200).json(bankAccount)
        } catch (err) {
            return res.status(500).json(err); //HTTP REQUEST CODE
        }

    },
    getById: async (req, res) => {
        try {
            const bankAccount = await BankAccount.findById(req.params.id).populate('user');
            return res.status(200).json(bankAccount);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    updateBankAccount: async (req, res) => {
        try {
            const bankAccount = await BankAccount.findById(req.body._id);
            await bankAccount.updateOne({ $set: req.body });
            return res.status(200).json("Update successfully");
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    deleteBankAccount: async (req, res) => {
        try {
            const bankAccount = await BankAccount.findById(req.body._id);
            bankAccount.isActive = false
            bankAccount.save()
            return res.status(200).json("Delete successfully")
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
}

module.exports = bankAccountController;