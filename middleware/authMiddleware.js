const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const User = require('../app/models/user')

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'Token not provided' })
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    req.decodedToken = decoded

    next()
  } catch (error) {
    console.error(error)
    return res.status(401).json({ error: 'Invalid token or token has expired' })
  }
}

module.exports = { verifyToken }
