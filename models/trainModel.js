const mongoose = require('mongoose')

const TrainSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    number: { type: String, required: true },
    name: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    sdt: { type: String, required: true },
    dat: { type: String, required: true },
    date: { type: String, required: true },
    tickets: { type: Number },
    amount: { type: Number, required: true },
})

module.exports = mongoose.model("SETrain", TrainSchema)   