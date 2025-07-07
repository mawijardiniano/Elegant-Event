const bookingService = require("../services/booking.service");

exports.getBookings = async (req, res) => {
  try {
    const booking = await bookingService.getBookings();
    res.json(booking);
  } catch (error) {
    console.error("Error fetching booking", error);
  }
};

exports.createBooking = async (req, res) => {
  try {
    const data = req.body;
    const booking = await bookingService.createBooking(data);

    res.status(201).json(booking);
  } catch (error) {
    console.error("Error creating booking", error);
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await bookingService.deleteBooking(parseInt(id));
        res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking", error);
  }
};
