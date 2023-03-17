const jwt = require('jsonwebtoken')


const varifytoken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        if (!token) {
            res.status(404).json({ error: 'No token available' });
            return
        }
        jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
            if (err) return res.status(404).json({error:'Your token has Expire please login'});
            req.user = decoded;
            next()
        })
    } else {
        return res.status(404).json({error:'you are not authenticated'})

    }
}

const varifyTokenAndAutorization = (req, res, next) => {
    varifytoken(req, res, () => {
        // console.log(req.user, 'from middleware')

        if (!req.user.id.id === req.params.id || req.user.id.isAdmin) {
            res.status(404).json({error:'sorry! you are not allowed'})
        } else {
            next()
        }
    })
}

const varifyTokenAndAdmin = (req, res, next) => {
    varifytoken(req, res, () => {

        if (req.user.id.isAdmin) {
            next()
        } else {
            res.status(404).json({error:'sorry! you are not allowed'})
        }
    })
}


module.exports = { varifytoken, varifyTokenAndAutorization, varifyTokenAndAdmin }