const mongoose = require('mongoose')

const TransactionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    amount: { type: Number, required: true },
    date: { type: String, required: true},
    payment_method: { type: String, required: true,default:'UPI'}
})

module.exports = mongoose.model("SETransaction", TransactionSchema)   