const express = require('express')

const router = express.Router()
const userController = require('../controllers/userController')
const adminCheck = require('../middlewares/adminCheck')
const authCheck = require('../middlewares/authCheck')

router.post('/signup',userController.signUp)
router.post('/login',userController.logIn) 
router.get('/info',authCheck,userController.getUser)
router.post('/update',authCheck,userController.updateUser)
router.get('/all',adminCheck,userController.getAllUser) 

module.exports = router 