const adminService = require("../services/admin.service")

exports.getAdmin = async(req, res) => {
    try {
        const users = await adminService.getAdmin();
        res.json(users)
    } catch (error) {
        console.error("Error fetching admins", error)
    }
}