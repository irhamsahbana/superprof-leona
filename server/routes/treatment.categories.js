const route = require('express').Router()
const TreatmentController = require('../controllers/treatment.controller')

route.post('/', TreatmentController.createCategory)
route.delete('/:id', TreatmentController.deleteCategory)

module.exports = route