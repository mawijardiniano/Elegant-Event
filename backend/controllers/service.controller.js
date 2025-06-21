const services = require("../services/service.service");

exports.getServices = async (req, res) => {
  try {
    const service = await services.getServices();
    res.json(service);
  } catch (error) {
    console.error("Error fetching service", error);
  }
};

exports.createService = async (req, res) => {
  try {
    const { serv_name, serv_price } = req.body;

    const service = await services.createService({ serv_name, serv_price });
    res.status(201).json(service);
  } catch (error) {
    console.error("Error adding service", error);
  }
};

exports.editService = async (req, res) => {
  try {
    const { id } = req.params;
    const { serv_name, serv_price } = req.body;

    if (!serv_name || serv_price == null) {
      return res
        .status(400)
        .json({ message: "Service name and price are required." });
    }

    const updatedService = await services.editService(parseInt(id), {
      serv_name,
      serv_price: parseFloat(serv_price),
    });

    res.status(200).json({
      message: "Service updated successfully",
      data: updatedService,
    });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await services.deleteService(parseInt(id));
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
  }
};
