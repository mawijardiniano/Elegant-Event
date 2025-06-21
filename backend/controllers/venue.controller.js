const venueService = require("../services/venue.service");

exports.getVenues = async (req, res) => {
  try {
    const venue = await venueService.getVenues();
    res.json(venue);
  } catch (error) {
    console.error("Error fetching venue", error);
  }
};

exports.createVenue = async (req, res) => {
  try {
    const {
      venue_name,
      venue_ratings,
      venue_desc,
      venue_capacity,
      venue_loc,
      venue_price,
      venue_tags = []
    } = req.body;

    if (!Array.isArray(venue_tags)) {
      return res.status(400).json({ message: "venue_tags must be an array of tag IDs." });
    }

    const venue = await venueService.createVenue({
      venue_name,
      venue_ratings,
      venue_desc,
      venue_capacity,
      venue_loc,
      venue_price,
      venue_tags
    });

    res.status(200).json(venue);
  } catch (error) {
    console.error("Error adding Venue", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.editVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      venue_name,
      venue_ratings,
      venue_desc,
      venue_capacity,
      venue_loc,
      venue_price,
      venue_tags,
    } = req.body;

    const updatedVenue = await venueService.editVenue(parseInt(id), {
      venue_name,
      venue_ratings: parseFloat(venue_ratings),
      venue_desc,
      venue_capacity,
      venue_loc,
      venue_price: parseFloat(venue_price),
      venue_tags,
    });
    res.status(200).json({
      message: "Updated Successfully",
      data: updatedVenue,
    });
  } catch (error) {
    console.error("Error updating venue");
  }
};


exports.deleteVenue = async (req, res) => {
    try {
        const {id} = req.body;
        await venueService.deleteVenue(parseInt(id))
        res.status(200).json({message: 'Deleted Successfully'})
    } catch (error) {
        console.error('Error deleting venue', error)
    }
}