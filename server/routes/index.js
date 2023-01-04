const express = require('express')
const router = express.Router()

router.use('/users', require('./users'))
router.use('/treatments', require('./treatments'))
router.use('/treatment-categories', require('./treatment.categories'))
router.use('/appointments', require('./appointments'))
router.use('/transactions', require('./transactions'))
router.use('/rooms', require('./rooms'))

module.exports = router