const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authService = {
  registerUser: async (name, email, password) => {
    try {
      const existingUser = await User.findOne({ where: { email } })

      if (existingUser) {
        throw new Error('Email is already registered')
      }

      const newUser = await User.create({ name, email, password })

      return newUser
    } catch (error) {
      throw error
    }
  },

  getUserByEmail: async (email) => {
    try {
      const user = await User.findOne({ where: { email } })

      return user
    } catch (error) {
      throw error
    }
  },

  updatePassword: async (userId, newPassword) => {
    try {
      await User.update({ password: newPassword }, { where: { id: userId } })
    } catch (error) {
      throw error
    }
  },

  generateAuthToken: (userId, email) => {
    const token = jwt.sign({ userId, email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    return token
  },
}

module.exports = authService
