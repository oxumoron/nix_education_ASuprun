const express = require('express')
// const controllers = require('../controllers/controllers.js')
const auth = require('../controllers/auth')
const router = express.Router();
const passport = require('passport')

// router.get('/try', passport.authenticate('jwt', {
//   session: false
// }), controllers.contactsAll)
router.post('/registration', auth.register)
router.post('/login', auth.login)
// router.post('/login', passport.authenticate('jwt', {
//   session: false
// }), auth.login)

module.exports = router