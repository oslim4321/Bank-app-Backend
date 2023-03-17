const express = require('express')
const route = express.Router()
const transactionController = require('../controllers/Transaction');
const { varifyTokenAndAutorization } = require('../middleware/VarifyToken');


// route.get('/transactions', transactionController.index);
route.post('/', varifyTokenAndAutorization, transactionController.create);
route.get('/:id', varifyTokenAndAutorization, transactionController.show);
// route.put('/transactions/:id', transactionController.update);
// route.delete('/transactions/:id', transactionController.delete);


module.exports = route