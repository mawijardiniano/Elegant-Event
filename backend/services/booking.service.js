const prisma = require("../config/prisma");

exports.getBookings = async () => {
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
  const { booking_date, ...rest } = data;

  const bookingData = {
    ...rest,
    booking_date: booking_date?.start ? new Date(booking_date.start) : undefined,
    booking_end: booking_date?.end ? new Date(booking_date.end) : undefined,
  };


  return await prisma.booking.create({
    data: bookingData,
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
