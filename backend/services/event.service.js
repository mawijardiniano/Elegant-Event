const prisma = require("../config/prisma");

exports.getEvents = async()=> {
    return await prisma.eventType.findMany()
}

exports.createEvent = async (data) => {
    return await prisma.eventType.create({
        data
    })
}