const express = require('express');
const router = express.Router();
const adminController = require("../controllers/admin.controller")

router.get('/', adminController.getAdmin)
router.post('/signup', adminController.signUp)

module.exports = router;