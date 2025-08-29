const prisma = require("../config/prisma");

exports.getBookings = async () => {
  await exports.updateBookingStatuses();

  return await prisma.booking.findMany({
    include: {
      venue: true,
      event_type: true,
      package: true,
      services: {
        include: {
          service: true,
        },
      },
    },
  });
};
exports.createBooking = async (data) => {
  const {
    booking_date,
    booking_end,
    booking_time,
    services,
    ...rest
  } = data;

  const bookingData = {
    ...rest,
    booking_date: booking_date ? new Date(booking_date) : null, // ✅ ensure valid Date
    booking_end: booking_end ? new Date(booking_end) : null,   
    booking_time,
  };

  // Only add services if array is not empty
  if (Array.isArray(services) && services.length > 0) {
    bookingData.services = {
      create: services.map((s) => ({ serv_id: s.serv_id })),
    };
  }

  return await prisma.booking.create({
    data: bookingData,
    include: {
      venue: true,
      event_type: true,
      package: true,
      services: { include: { service: true } },
    },
  });
};


exports.updateBooking = async (id, data) => {
  return await prisma.booking.update({
    where: { booking_id: id },
    data,
  });
};

exports.deleteBooking = async (id) => {
  return await prisma.booking.delete({
    where: { booking_id: id },
  });
};

exports.updateBookingStatuses = async () => {
  const now = new Date();
  const startOfToday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const endOfToday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));

  console.log("startOfToday (UTC):", startOfToday.toISOString());
  console.log("endOfToday (UTC):", endOfToday.toISOString());

  const completed = await prisma.booking.updateMany({
    where: {
      AND: [
        {
          OR: [
            { booking_end: { lt: startOfToday } },
            { booking_end: null, booking_date: { lt: startOfToday } },
          ],
        },
        { status: { not: "COMPLETED" } },
      ],
    },
    data: { status: "COMPLETED" },
  });
  console.log("Completed updated:", completed.count);

  const active = await prisma.booking.updateMany({
    where: {
      AND: [
        {
          OR: [
            {
              booking_date: { lte: endOfToday },
              booking_end: { gte: startOfToday },
            },
            {
              booking_end: null,
              booking_date: {
                gte: startOfToday,
                lt: endOfToday,
              },
            },
          ],
        },
        { status: { not: "ACTIVE" } },
      ],
    },
    data: { status: "ACTIVE" },
  });
  console.log("Active updated:", active.count);

  const pending = await prisma.booking.updateMany({
    where: {
      booking_date: { gt: endOfToday },
      status: { not: "PENDING" },
    },
    data: { status: "PENDING" },
  });
  console.log("Pending updated:", pending.count);

  console.log("Booking statuses updated successfully");
};
