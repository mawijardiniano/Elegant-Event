const packageService = require("../services/package.service");

exports.getPackage = async (req, res) => {
  try {
    const packages = await packageService.getPackage();
    res.json(packages);
  } catch (error) {
    console.error("Error fetching packages", error);
    res.status(500).json({ error: "Failed to fetch packages" });
  }
};

exports.createPackage = async (req, res) => {
  try {
    const { package_name, package_price, package_desc, features } = req.body;

    const createdPackage = await packageService.createPackage({
      package_name,
      package_price,
      package_desc,
      features: JSON.stringify(features),
    });

    res.status(201).json({ data: createdPackage });
  } catch (error) {
    console.error("Error creating package", error);
    res.status(500).json({ error: "Failed to create package" });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    await packageService.deletePackage(parseInt(id));
    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error("Error deleting package", error);
    res.status(500).json({ error: "Failed to delete package" });
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

    res.status(200).json({ data: updatedPackage });
  } catch (error) {
    console.error("Error updating package", error);
    res.status(500).json({ error: "Failed to update package" });
  }
};
