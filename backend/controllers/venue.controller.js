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
      tag_id = []
    } = req.body;

    if (!Array.isArray(tag_id)) {
      return res.status(400).json({ message: "venue_tags must be an array of tag IDs." });
    }

    const venue = await venueService.createVenue({
      venue_name,
      venue_ratings,
      venue_desc,
      venue_capacity,
      venue_loc,
      venue_price,
      tag_id
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
      tag_id,
    } = req.body;

    const updateData = {};

    if (venue_name !== undefined) updateData.venue_name = venue_name;
    if (venue_ratings !== undefined) updateData.venue_ratings = parseFloat(venue_ratings);
    if (venue_desc !== undefined) updateData.venue_desc = venue_desc;
    if (venue_capacity !== undefined) updateData.venue_capacity = parseInt(venue_capacity);
    if (venue_loc !== undefined) updateData.venue_loc = venue_loc;
    if (venue_price !== undefined) updateData.venue_price = parseFloat(venue_price);

    if (tag_id !== undefined && tag_id !== null && tag_id !== '') {
      updateData.tag = {
        connect: { tag_id: parseInt(tag_id) },
      };
    }

    const updatedVenue = await venueService.editVenue(parseInt(id), updateData);

    res.status(200).json({
      message: "Venue updated successfully",
      data: updatedVenue,
    });
  } catch (error) {
    console.error("Error updating venue:", error);
    res.status(500).json({ message: "Internal server error" });
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