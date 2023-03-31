const express = require('express')

const router = express.Router()
const userController = require('../controllers/userController')
const authCheck = require('../middlewares/authCheck')

router.post('/signup',userController.signUp)
router.post('/login',userController.logIn) 
router.get('/info',authCheck,userController.getUser)
router.post('/update',authCheck,userController.updateUser)

module.exports = router