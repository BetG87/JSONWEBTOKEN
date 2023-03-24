const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minlength: 6,
        maxlength: 20,
        unique: true
    },
    email: {
        type: String,
        require: true,
        minlength: 10,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    numberPhone: {
        type: String,
        require: true,
        minlength: 8
    },
    admin: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    bankAccounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BankAccount',
    }],
    gameAccounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GameAccount',
    }],
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Status',
    },
},
    {
        timestamps:true
    })


    module.exports = mongoose.model("User", userSchema)