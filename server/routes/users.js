const route = require('express').Router()
const UserController = require('../controllers/user.controller')

route.get('/', UserController.index)
route.post('/', UserController.create)
route.put('/:id', UserController.update)
route.delete('/:id', UserController.delete)

module.exports = route