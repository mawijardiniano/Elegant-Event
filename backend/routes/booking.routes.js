const bookingController = require('../controllers/booking.controller')
const express = require('express')
const router = express.Router();

router.get('/', bookingController.getBookings);
router.post('/add-booking', bookingController.createBooking)

module.exports = router;