const mongoose = require('mongoose')

const TicketSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userid: { type: String, required: true },
    train: { type: String, required: true },
    trainid: { type: String, required: true },
    source: { type: String, required: true },
    dest: { type: String, required: true },
    passengers: { type: Number, required: true },
    date: { type: String, required: true },
    bookdate: { type: String, required: true },
    amount:{type:Number, required:true}
})

module.exports = mongoose.model("SETicket", TicketSchema)   