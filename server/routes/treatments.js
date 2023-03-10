const route = require('express').Router()
const TreatmentController = require('../controllers/treatment.controller')

route.get('/', TreatmentController.index)
route.post('/', TreatmentController.create)
route.delete('/:id', TreatmentController.delete)

module.exports = route