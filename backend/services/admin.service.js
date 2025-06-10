const prisma = require("../config/prisma");

exports.getAdmin = async () => {
    return await prisma.admin.findMany()
}