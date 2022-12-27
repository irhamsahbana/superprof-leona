const route = require('express').Router()
const TreatmentController = require('../controllers/treatment.controller')

route.get('/', TreatmentController.index)

module.exports = route