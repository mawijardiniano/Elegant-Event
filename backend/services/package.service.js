const prisma = require("../config/prisma");

exports.getPackage = async () => {
  const packages = await prisma.package.findMany();
  return packages.map(pkg => ({
    ...pkg,
    features: pkg.features ? JSON.parse(pkg.features) : [],
  }));
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
