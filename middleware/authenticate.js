const jwt = require('jsonwebtoken')
const User = require('../models/userModel')




const protect = (req, res, next) => {

    const { authorization } = req.headers;


    if (!authorization) {
        return res.status(401).send({ error: 'You must be logged in.' })

    }
    const token = authorization.replace('Bearer ', '')

    jwt.verify(token, process.env.JSON_SECRET, async (err, payload) => {

        if (err) {
            return res.status(401).send({ error: 'you must be logged in.' })

        }
        const { userId } = payload
        const user = await User.findById(userId)
        req.user = user
        next()
    })


}

const admin = (req, res, next) => {
    if (req.user && req.user.admin) {
        next()
    }
    else {
        res.status(401)
        throw new Error('Not Authorized as an admin')
    }
}

module.exports = { protect, admin }