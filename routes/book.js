const express = require('express')
const authCheck = require('../middlewares/authCheck')
const bookingController = require('../controllers/bookingController')
const adminCheck = require('../middlewares/adminCheck')

const router = express.Router()

router.get('/', authCheck, bookingController.getBookings)
router.post('/',authCheck,bookingController.cancelBooking)
router.get('/getall',adminCheck,bookingController.getAllBookings)

module.exports = router 