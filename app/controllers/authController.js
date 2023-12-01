const authService = require('../services/authService')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = await authService.registerUser(name, email, hashedPassword)

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h',
        },
      )

      res.status(201).json({ userId: user.id, email: user.email, token })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body

      const user = await authService.getUserByEmail(email)

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      const passwordMatch = await bcrypt.compare(password, user.password)

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h',
        },
      )

      res.status(200).json({ userId: user.id, email: user.email, token })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  logout: (req, res) => {
    res.status(200).json({ message: 'Logout successful' })
  },

  getUserInfo: (req, res) => {
    const { userId, email } = req.decodedToken
    res.status(200).json({ userId, email })
  },

  refreshToken: (req, res) => {
    res.status(200).json({ message: 'Token refreshed successfully' })
  },

  changePassword: async (req, res) => {
    try {
      const { userId } = req.decodedToken
      const { newPassword } = req.body

      const hashedPassword = await bcrypt.hash(newPassword, 10)

      await authService.updatePassword(userId, hashedPassword)

      res.status(200).json({ message: 'Password updated successfully' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },
}

module.exports = authController
