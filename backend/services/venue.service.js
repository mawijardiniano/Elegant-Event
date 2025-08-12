const prisma = require('../config/prisma')

exports.getVenues = async () => {
  return await prisma.venue.findMany({
    include: {
      bookings: true,
      tag: true 
    }
  });
};

exports.createVenue = async (data) => {
  const { tag_id, ...otherData } = data

  const venue = await prisma.venue.create({
    data: {
      ...otherData,
      tag_id: tag_id ? Number(tag_id) : null
    }
  })

  return await prisma.venue.findUnique({
    where: { venue_id: venue.venue_id },
    include: { tag: true } 
  })
}


exports.editVenue = async (id, data) => {
  return await prisma.venue.update({
    where: { venue_id: id },
    data,
    include: {
      tag: true
       
      
    }
  })
}

exports.deleteVenue = async (id) => {
  return await prisma.venue.delete({
    where: { venue_id: id }
  })
}
