const prisma = require('../config/prisma')

exports.getVenues = async () => {
    return await prisma.venue.findMany()
}
exports.createVenue = async (data) => {
  const { venue_tags, ...otherData } = data;

  return await prisma.venue.create({
    data: {
      ...otherData,
      venue_tags: {
        create: venue_tags.map((tag_id) => ({
          tag: {
            connect: { tag_id }
          }
        }))
      }
    },
    include: {
      venue_tags: {
        include: {
          tag: true
        }
      }
    }
  });
};

exports.editVenue = async (id, data) => {
    return await prisma.venue.update({
        where: {venue_id: id}, 
        data
    })
}

exports.deleteVenue = async (id) => {
    return await prisma.venue.delete({
        where: {venue_id: id}, 
    })
}

