const express = require('express');
const router = express.Router();
const eventController = require("../controllers/event.controller")

router.get('/', eventController.getEvents)
router.post('/add-event', eventController.createEvent)

module.exports = router;