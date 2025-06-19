const express = require('express');
const router = express.Router();
const eventController = require("../controllers/event.controller")

router.get('/', eventController.getEvents)
router.post('/add-event', eventController.createEvent)
router.delete('/delete-event/:id', eventController.deleteEvent)
router.put('/edit-event/:id', eventController.editEvent)

module.exports = router;