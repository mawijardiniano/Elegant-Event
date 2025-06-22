const prisma = require('../config/prisma')


exports.getBookings = async () => {
    return await prisma.booking.findMany({
        include: {
      venue: true,
      event_type: true,
      package: true,
      add_ons: true,
    },
    })
}

exports.createBooking = async (data) => {
  return await prisma.booking.create({
    data,
    include: {
      venue: true,
      event_type: true,
      package: true,
      add_ons: true,
    },
  });
};


exports.updateBooking = async (id, data) => {
    return await prisma.booking.update({
        where: {booking_id: id},
        data
    })
}

exports.deleteBooking = async (id) => {
    return await prisma.booking.delete({
        where: {booking_id: id}
    })
}