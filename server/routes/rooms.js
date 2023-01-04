const route = require('express').Router()
const RoomController = require('../controllers/room.controller')

route.get('/', RoomController.index)
route.post('/', RoomController.create)
route.put('/:id', RoomController.update)
route.delete('/:id', RoomController.delete)

module.exports = route