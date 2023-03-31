const ticketModel = require("../models/ticketModel")
const trainModel = require("../models/trainModel")
const userModel = require("../models/userModel")

module.exports.getBookings = async (req, res, next) => {

    tickets = await ticketModel.find({ userid: req.UserData.userId }).sort('-bookdate').exec()

    res.status(200).json(tickets)

}

module.exports.cancelBooking = async (req, res, next) => {
    try {
        id = req.query.id
        uid = req.UserData.userId
        tid = req.query.tid
        ticket = await ticketModel.findById(id).exec()
        train = await trainModel.findById(tid).exec()
        console.log(ticket)
        user = await userModel.findById(uid).exec()

        user.account += ticket.amount
        train.tickets += ticket.passengers
        user.save()
        train.save()
        ticketModel.findByIdAndDelete(id).exec()

        return res.status(204).json({ 'msg': 'reservation cancelled successfully' })
    }
    catch (err) {
        res.json({ 'msg': err })
    }
}