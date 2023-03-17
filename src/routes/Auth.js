const express = require('express')
const route = express.Router()
const Auth = require('../controllers/Auth')

route.post('/login', Auth.login)

/* create accunt */
route.post('/OpenAccount', Auth.OpenUserACcount)


module.exports = route