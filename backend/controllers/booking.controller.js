const bookingService = require("../services/booking.service");
const { sendEmail } = require("../utils/mailer");

exports.getBookings = async (req, res) => {
  try {
    const booking = await bookingService.getBookings();
    res.json(booking);
  } catch (error) {
    console.error("Error fetching booking", error);
  }
};
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

exports.createBooking = async (req, res) => {
  try {
    const data = req.body;

    const booking = await bookingService.createBooking(data);

    if (booking?.email && booking?.venue?.venue_name) {
      const formattedStart = formatDate(booking.booking_date);
      const formattedEnd = booking.booking_end
        ? formatDate(booking.booking_end)
        : null;

      const bookingDateText = formattedEnd
        ? `${formattedStart} to ${formattedEnd}`
        : formattedStart;

      await sendEmail(
        booking.email,
        "🎉 Booking Confirmation",
        `
          <h3>Hello ${booking.first_name},</h3>
          <p>Thank you for booking with Elegant Events!</p>
          <p>Your booking for <strong>${booking.venue.venue_name}</strong> on <strong>${bookingDateText}</strong> is confirmed.</p>
          <br/>
          <p>We look forward to making your event special.</p>
          <br/>
          <p>Best regards,<br/>Elegant Events Team</p>
        `
      );
    }

    res.status(201).json(booking);
  } catch (error) {
    console.error("❌ Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking" });
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
