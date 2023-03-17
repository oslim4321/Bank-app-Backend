const express = require('express')
const route = express.Router()
const userController = require('../controllers/User')
const {varifytoken, varifyTokenAndAutorization} = require('../middleware/VarifyToken')



/* get single user account */
route.get('/:id', varifyTokenAndAutorization, userController.show);

route.get('/getUserbaseTansac/:id',varifyTokenAndAutorization, userController.getUserBaseTransa )

/* update user Account */
// route.put('/:id', userController.update);

// /* delete user account */
route.delete('/:id', userController.delete);

// /* get all user only for ADMIN */
route.get('', userController.index);



module.exports = route