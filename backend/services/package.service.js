const prisma = require("../config/prisma");

exports.getPackage = async () => {
  return await prisma.package.findMany();
};

exports.createPackage = async (data) => {
  return await prisma.package.create({
    data,
  });
};

exports.deletePackage = async (id) => {
  return await prisma.package.delete({
    where: { package_id: id },
  });
};


exports.editPackage = async (id,data) => {
  return await prisma.package.update({
    where: { package_id: id },
    data
  });
};
