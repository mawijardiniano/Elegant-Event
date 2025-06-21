const venueController = require('../controllers/venue.controller')
const express = require('express')
const router = express.Router()

router.get('/',venueController.getVenues)
router.post('/add-venue', venueController.createVenue)
router.put('/edit-venue/:id', venueController.editVenue)

module.exports = router;