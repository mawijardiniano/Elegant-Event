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
    console.log("📩 Incoming request body:", req.body);
    const data = req.body;

    // ✅ Normalize and validate dates
    const bookingDate = data.booking_date
      ? new Date(data.booking_date)
      : undefined;
    if (bookingDate && isNaN(bookingDate.getTime())) {
      return res.status(400).json({ error: "Invalid booking_date" });
    }

    const bookingEnd = data.booking_end
      ? new Date(data.booking_end)
      : undefined;
    if (bookingEnd && isNaN(bookingEnd.getTime())) {
      return res.status(400).json({ error: "Invalid booking_end" });
    }

    // ✅ Build payload for Prisma
    const bookingPayload = {
      venue_id: data.venue_id,
      package_id: data.package_id,
      event_type_id: data.event_type_id,
      booking_date: bookingDate,
      booking_end: bookingEnd,
      booking_time: data.booking_time ?? undefined,
      total_price: data.total_price ?? 0,
      expected_guest: data.expected_guest ?? 0,
      event_name: data.event_name ?? "",
      description: data.description ?? undefined,
      request: data.request ?? undefined,
      first_name: data.first_name ?? "",
      last_name: data.last_name ?? "",
      email: data.email ?? "",
      number: data.number ?? "",
      // ✅ Nested create for services
      services: data.services?.length
        ? {
            create: data.services.map((s) => ({
              serv_id: s.serv_id,
            })),
          }
        : undefined,
    };

    console.log("📦 Payload for Prisma:", bookingPayload);

    // ✅ Create booking in DB
    let booking;
    try {
      booking = await bookingService.createBooking(bookingPayload);
    } catch (dbErr) {
      console.error("❌ DB error:", dbErr);
      return res
        .status(500)
        .json({ error: "Database insert failed", details: dbErr.message });
    }

    console.log("✅ Booking created:", booking);

    // ✅ Send confirmation email
    if (booking?.email && booking?.venue?.venue_name) {
      const formattedStart = booking.booking_date
        ? formatDate(booking.booking_date)
        : "";
      const formattedEnd = booking.booking_end
        ? formatDate(booking.booking_end)
        : undefined;

      const bookingDateText = formattedEnd
        ? `${formattedStart} to ${formattedEnd}`
        : formattedStart;

      try {
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
        console.log("✅ Email sent successfully to:", booking.email);
      } catch (mailErr) {
        console.error("⚠️ Email sending failed:", mailErr.message);
      }
    }

    return res.status(201).json(booking);
  } catch (error) {
    console.error("❌ Unexpected error:", error);
    return res
      .status(500)
      .json({ error: "Failed to create booking", details: error.message });
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
