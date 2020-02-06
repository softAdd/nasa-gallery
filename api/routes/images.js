const express = require('express')
const imagesController = require('../controllers/images')
const router = express.Router()
const passport = require('passport')

router.get('/saved',  passport.authenticate('jwt', { session: false }), imagesController.getSaved)


module.exports = router