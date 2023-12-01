const taskService = require('../services/taskService')

const TaskController = {
  async createTask(req, res) {
    try {
      const { title, description, userId } = req.body

      const decodedUserId = req.decodedToken.userId

      if (userId !== decodedUserId) {
        return res.status(403).json({ error: 'Forbidden: User ID mismatch' })
      }

      const newTask = await taskService.createTask(title, description, userId)
      res.status(201).json(newTask)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  async getAllTasks(req, res) {
    try {
      const userId = req.decodedToken.userId

      const tasks = await taskService.getAllTasks(userId)
      res.status(200).json(tasks)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  async getTaskById(req, res) {
    try {
      const taskId = req.params.id
      const userId = req.decodedToken.userId

      const task = await taskService.getTaskById(taskId, userId)

      if (task) {
        res.status(200).json(task)
      } else {
        res.status(404).json({ error: 'Task not found or unauthorized' })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  async updateTask(req, res) {
    try {
      const taskId = req.params.id
      const userId = req.decodedToken.userId
      const { title, description } = req.body

      const updatedTask = await taskService.updateTask(
        taskId,
        title,
        description,
        userId,
      )

      if (updatedTask) {
        res.status(200).json(updatedTask)
      } else {
        res.status(404).json({ error: 'Task not found or unauthorized' })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },

  async deleteTask(req, res) {
    try {
      const taskId = req.params.id
      const userId = req.decodedToken.userId
      const deletedTask = await taskService.deleteTask(taskId, userId)
      if (deletedTask) {
        res.status(204).send()
      } else {
        res.status(404).json({ error: 'Task not found or unauthorized' })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  },
}

module.exports = TaskController
