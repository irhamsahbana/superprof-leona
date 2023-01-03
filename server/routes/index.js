const express = require('express')
const router = express.Router()

router.use('/users', require('./users'))
router.use('/treatments', require('./treatments'))
router.use('/appointments', require('./appointments'))
router.use('/transactions', require('./transactions'))

module.exports = router