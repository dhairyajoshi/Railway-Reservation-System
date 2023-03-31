const TrainModel = require('../models/trainModel')
const mongoose = require('mongoose')
const transactionModel = require('../models/transactionModel')
const ticketModel = require('../models/ticketModel')
const userModel = require('../models/userModel')

module.exports.addTrain = async (req, res, next) => {
    train = new TrainModel({
        _id: new mongoose.Types.ObjectId(),
        number: req.body['number'],
        name: req.body['name'],
        source: req.body['source'],
        destination: req.body['destination'],
        sdt: req.body['sdt'],
        dat: req.body['dat'],
        date: req.body['date'],
        tickets: req.body['tickets'],
        amount: req.body['amount']
    })
    await train.save()
    res.status(200).json({ 'msg': 'Train added successfully' })
}
randomTime = () => {
    hrs = Math.round(Math.random() * 24);
    mins = Math.round(Math.random() * 60);
    var hFormat = (hrs < 10 ? "0" : "");
    var mFormat = (mins < 10 ? "0" : "");
    var amPm = (hrs < 12 ? "AM" : "PM");
    var is12 = (hrs % 12 === 0);

    return amPm === "AM" && !is12 ? String(hFormat + hrs + ":" + mFormat + mins + " " + amPm)
        : "AM" && is12 ? String(12 + ":" + mFormat + mins + " " + amPm)
            : is12 ? String(hFormat + hrs + ":" + mFormat + mins + " " + amPm)
                : String(hFormat + (hrs - 12) + ":" + mFormat + mins + " " + amPm);

}
module.exports.getAll = async (req, res, next) => {
    src = req.query.s
    dest = req.query.d
    dt = req.query.dt
    trains = await TrainModel.find({ $and: [{ source: src }, { destination: dest }, { date: dt }] }).exec()
    if (trains === undefined || trains.length == 0) {
        for (i = 0; i < 5; i++) {
            tn = Math.floor(100000 + Math.random() * 900000)
            tkt = Math.floor(100 + Math.random() * 500)
            amt = Math.floor(100 + Math.random() * 900)
            curr = new Date()
            curh = curr.getHours() + Math.floor(1 + Math.random() * 3)
            curm = curr.getMinutes()
            lath = (curh + Math.floor(1 + Math.random() * 11)) % 24
            latm = (curm + Math.floor(10 + Math.random() * 40)) % 60
            if (curm < 10)
                curm = '0' + String(curm)
            if (latm < 10)
                latm = '0' + String(latm)
            if (curh < 10)
                curh = '0' + String(curh)
            if (lath < 10)
                lath = '0' + String(lath)
            train = new TrainModel({
                _id: new mongoose.Types.ObjectId(),
                number: String(tn),
                name: src + ' - ' + dest + ' express',
                source: src,
                destination: dest,
                sdt: curh + ':' + curm,
                dat: lath + ':' + latm,
                date: dt,
                tickets: tkt,
                amount: amt
            })

            await train.save();
            trains.push(train)
        }
        // trains.append(train)
        return res.status(200).json(trains)
    }
    res.status(200).json(trains)
}

module.exports.bookTicket = async (req, res, next) => {
    tn = req.query.tn
    dt = req.query.dt
    no = req.query.no
    user = await userModel.findById(req.UserData['userId']).exec()
    train = await TrainModel.findOne({ $and: [{ number: tn }, { date: dt }] }).exec()
    if(train.amount*no>user.account){
        return res.status(400).json({'msg':'Not enough money in account!'})
    }
    if(train.tickets<no){
        return res.status(400).json({'msg':'Seats not available!'})
    }
    train.tickets -= no
    await train.save()

    transaction = new transactionModel({
        _id: new mongoose.Types.ObjectId(),
        amount: train.amount*no,
        date: Date.now(),
        payment_method: 'UPI'
    })

    ticket = new ticketModel({
        _id: new mongoose.Types.ObjectId(),
        userid: req.UserData.userId,
        train: train.number + ' ' + train.name,
        trainid: train.id,
        source: train.source,
        dest: train.destination,
        passengers: no,
        date: train.date,
        bookdate: Date.now(), 
        amount:train.amount*no 
    })

    user.account -= train.amount*no 
    console.log('reached') 
    user.save()
    transaction.save()
    ticket.save()

    res.status(200).json({ 'msg': 'Ticket booked successfully' })
}