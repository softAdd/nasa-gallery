const express = require('express')
const imagesController = require('../controllers/images')
const router = express.Router()

router.get('/global/search', imagesController.globalSearch)
router.get('/user/all', imagesController.userAll)
router.post('/save', imagesController.save)
router.delete('/delete', imagesController.delete)

module.exports = router