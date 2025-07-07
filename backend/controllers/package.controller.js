const packageService = require("../services/package.service");

exports.getPackage = async (req, res) => {
  try {
    const packages = await packageService.getPackage();
    res.json(packages);
  } catch (error) {
    console.error("Error fetching packages", error);
  }
};

exports.createPackage = async (req, res) => {
  try {
    const { package_name, package_price, package_desc, features } = req.body;

    const packages = await packageService.createPackage({
      package_name,
      package_price,
      package_desc,
      features: JSON.stringify(features),
    });
    res.status(201).json(packages);
  } catch (error) {
    console.error("Error creating packages", error);
  }
};

exports.deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    await packageService.deletePackage(parseInt(id));
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error("Error deleting packages", error);
  }
};

exports.editPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { package_name, package_price, package_desc, features } = req.body;

    const updatedPackage = await packageService.editPackage(parseInt(id), {
      package_name,
      package_price,
      package_desc,
      features: JSON.stringify(features),
    });

    res.status(200).json({
      data: updatedPackage,
    });
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error("Error deleting packages", error);
  }
};
