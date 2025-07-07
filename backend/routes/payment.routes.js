const {createPayment} = require('../controllers/payment.controller')
const express = require('express')
const router = express.Router()


router.post('/create-payment', createPayment)


module.exports = router