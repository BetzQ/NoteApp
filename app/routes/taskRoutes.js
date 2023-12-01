const express = require('express')
const taskController = require('../controllers/taskController')
const authMiddleware = require('../../middleware/authMiddleware')

const router = express.Router()

router.post('/', authMiddleware.verifyToken, taskController.createTask)

router.get('/', authMiddleware.verifyToken, taskController.getAllTasks)

router.get('/:id', authMiddleware.verifyToken, taskController.getTaskById)

router.put('/:id', authMiddleware.verifyToken, taskController.updateTask)

router.delete('/:id', authMiddleware.verifyToken, taskController.deleteTask)

module.exports = router
