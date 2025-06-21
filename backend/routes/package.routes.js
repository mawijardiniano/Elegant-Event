const packageController = require('../controllers/package.controller')
const express = require('express');
const router = express.Router();

router.get('/', packageController.getPackage)
router.post('/add-package', packageController.createPackage)
router.delete('/delete-package/:id', packageController.deletePackage)
router.put('/edit-package/:id', packageController.editPackage)

module.exports = router;