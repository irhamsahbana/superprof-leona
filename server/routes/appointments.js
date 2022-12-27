const route = require('express').Router()
const AppointmentController = require('../controllers/appointment.controller')

route.get('/', AppointmentController.index)
route.post('/', AppointmentController.create)
route.put('/:id', AppointmentController.update)
route.delete('/:id', AppointmentController.delete)

module.exports = route
