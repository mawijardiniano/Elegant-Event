// package.service.js
const prisma = require("../config/prisma");

exports.getPackage = async () => {
  const packages = await prisma.package.findMany();

  return packages.map(pkg => {
    let featuresParsed = [];
    if (pkg.features) {
      try {
        featuresParsed = JSON.parse(pkg.features); 
      } catch {

        featuresParsed = pkg.features.split(",").map(s => s.trim());
      }
    }
    return {
      ...pkg,
      features: featuresParsed,
    };
  });
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

exports.editPackage = async (id, data) => {
  return await prisma.package.update({
    where: { package_id: id },
    data,
  });
};
