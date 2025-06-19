const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminService = require("../services/admin.service");
const { Trophy } = require("lucide-react");

exports.getAdmin = async (req, res) => {
  try {
    const users = await adminService.getAdmin();
    res.json(users);
  } catch (error) {
    console.error("Error fetching admins", error);
  }
};


exports.signUp = async (req, res) => {
  try {
    const { password, ...otherData } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = {
      ...otherData,
      password: hashedPassword,
    };

    const newAdmin = await adminService.signUp(data);
    res.status(201).json(newAdmin);
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
