const express = require('express')
const route = express.Router()
const SendMoneyTrans = require('../controllers/SendMoneyTrans')
const { varifyTokenAndAutorization } = require('../middleware/VarifyToken')

route.post('/', varifyTokenAndAutorization, SendMoneyTrans.sendMoney)

module.exports = route