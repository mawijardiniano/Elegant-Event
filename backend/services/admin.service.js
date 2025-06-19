const prisma = require("../config/prisma");

exports.getAdmin = async () => {
  return await prisma.admin.findMany();
};

exports.signUp = async (data) => {
  return await prisma.admin.create({
    data,
  });
};