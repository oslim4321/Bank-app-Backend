
const jwt = require('jsonwebtoken')


module.exports.createToken = (id, isAdmin) => {
    return jwt.sign({ id, isAdmin }, process.env.JWT_SEC, {
        expiresIn: process.env.JWT_LIFETIME
    })
}