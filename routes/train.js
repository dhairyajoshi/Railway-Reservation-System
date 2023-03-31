const express = require('express')
const router = express.Router()
const trainController = require('../controllers/trainController')
const adminCheck = require('../middlewares/adminCheck')
const authCheck = require('../middlewares/authCheck')
router.post('/add',adminCheck,trainController.addTrain)
router.get('/getall',authCheck,trainController.getAll)
router.post('/book',authCheck,trainController.bookTicket)

module.exports=router