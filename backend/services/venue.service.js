const prisma = require('../config/prisma')

exports.getVenues = async () => {
    return await prisma.venue.findMany()
}

exports.createVenue = async (data) => {
    return await prisma.venue.create({
        data
    })
}

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

