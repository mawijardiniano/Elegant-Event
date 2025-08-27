const prisma = require('../config/prisma')

exports.getVenues = async () => {
  return await prisma.venue.findMany({
    include: {
      bookings: true,
      venueTags: {
        include: {
          tag: true
        }
      }
    }
  });
};



exports.createVenue = async (data) => {
  const { tags: tagIds, ...otherData } = data;

  const venue = await prisma.venue.create({
    data: {
      ...otherData,
      venueTags: {
        create: tagIds?.map(tag_id => ({
          tag: { connect: { tag_id: parseInt(tag_id) } } 
        }))
      }
    },
    include: {
      venueTags: { include: { tag: true } }
    }
  });

  return venue;
};




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
