const tagController = require('../controllers/tag.controller')
const express = require('express')
const router = express.Router()

router.get('/', tagController.getTags);
router.post('/add-tag', tagController.createTags);
router.put('/edit-tag', tagController.updateTags);
router.delete('/delete-tag', tagController.deleteTags)

module.exports = router