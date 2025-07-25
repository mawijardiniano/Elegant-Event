// routes/venue.routes.js
const express = require("express");
const venueController = require("../controllers/venue.controller");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/", venueController.getVenues);
router.post("/add-venue", upload.single("venue_img"), venueController.createVenue);
router.put("/edit-venue/:id",upload.single("venue_img"), venueController.editVenue);
router.delete("/delete-venue/:id", venueController.deleteVenue);

module.exports = router;
