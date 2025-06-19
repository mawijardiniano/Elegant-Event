const prisma = require("../config/prisma");

exports.getEvents = async()=> {
    return await prisma.eventType.findMany()
}

exports.createEvent = async (data) => {
    return await prisma.eventType.create({
        data
    })
}

exports.deleteEvent = async (id) => {
    return await prisma.eventType.delete({
        where: {event_type_id: id}
    })
}

exports.editEvent = async (id, data) => {
    return await prisma.eventType.update({
        where: {event_type_id: id},
        data
    })
}