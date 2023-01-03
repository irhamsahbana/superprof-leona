const route = require('express').Router()
const TransactionController = require('../controllers/transaction.controller')

route.get('/', TransactionController.index)
route.post('/', TransactionController.create)
route.delete('/:id', TransactionController.delete)

module.exports = route
