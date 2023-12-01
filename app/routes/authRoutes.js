const express = require('express')
const authController = require('../controllers/authController')
const authMiddleware = require('../../middleware/authMiddleware')

const router = express.Router()

router.post('/register', authController.register)

router.post('/login', authController.login)

router.post('/logout', authMiddleware.verifyToken, authController.logout)

router.get('/user', authMiddleware.verifyToken, authController.getUserInfo)

router.post('/refresh-token', authController.refreshToken)

router.put(
  '/change-password',
  authMiddleware.verifyToken,
  authController.changePassword,
)

module.exports = router
