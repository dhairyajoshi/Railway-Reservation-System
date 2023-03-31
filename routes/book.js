const express = require('express')
const authCheck = require('../middlewares/authCheck')
const bookingController = require('../controllers/bookingController')

const router = express.Router()

router.get('/', authCheck, bookingController.getBookings)
router.post('/',authCheck,bookingController.cancelBooking)

module.exports = router 