const prisma = require('../config/prisma')

exports.getServices = async() => {
    return await prisma.service.findMany()
}

exports.createService = async (data) => {
    return await prisma.service.create({
        data
    })
}

exports.editService = async (id, data) => {
    return await prisma.service.update({
        where : {serv_id: id},
        data
    })
}

exports.deleteService = async(id) => {
    return await prisma.service.delete({
        where: {serv_id: id}
    })
}