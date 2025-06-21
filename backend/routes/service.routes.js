const serviceController = require('../controllers/service.controller')
const express = require('express');
const router = express.Router();


router.get('/', serviceController.getServices)
router.post('/add-service', serviceController.createService)
router.put('/edit-service/:id', serviceController.editService)
router.delete('/delete-service/:id', serviceController.deleteService)

module.exports = router