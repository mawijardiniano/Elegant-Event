const prisma = require('../config/prisma')

exports.getVenues = async () => {
  return await prisma.venue.findMany({
    include: {
      bookings: true,       
      tags: {                  
        include: {
          tag: true           
        }
      }
    }
  })
}

exports.createVenue = async (data) => {
  const { tag_id, ...otherData } = data

  const venue = await prisma.venue.create({
    data: { ...otherData }
  })

  if (Array.isArray(tag_id) && tag_id.length > 0) {
    const tagLinks = tag_id.map(id => ({
      venue_id: venue.venue_id,
      tag_id: Number(id)
    }))

    await prisma.venueTag.createMany({ data: tagLinks })
  }

  return await prisma.venue.findUnique({
    where: { venue_id: venue.venue_id },
    include: {
      tags: {
        include: { tag: true }
      }
    }
  })
}

exports.editVenue = async (id, data) => {
  return await prisma.venue.update({
    where: { venue_id: id },
    data,
    include: {
      tags: {            
        include: { tag: true }
      }
    }
  })
}

exports.deleteVenue = async (id) => {
  return await prisma.venue.delete({
    where: { venue_id: id }
  })
}
