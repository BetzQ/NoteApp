const Task = require('../models/task')

const TaskService = {
  async createTask(title, description, userId) {
    try {
      const newTask = await Task.create({ title, description, userId })
      return newTask
    } catch (error) {
      throw error
    }
  },

  async getAllTasks(userId) {
    try {
      const tasks = await Task.findAll({
        where: { userId },
      })
      return tasks
    } catch (error) {
      throw error
    }
  },

  async getTaskById(taskId, userId) {
    try {
      const task = await Task.findByPk(taskId)

      if (!task) {
        return null
      }

      if (task.userId !== userId) {
        return null
      }

      return task
    } catch (error) {
      throw error
    }
  },

  async updateTask(taskId, title, description, userId) {
    try {
      const task = await Task.findByPk(taskId)

      if (!task) {
        return null
      }

      if (task.userId !== userId) {
        return null
      }

      task.title = title || task.title
      task.description = description || task.description
      await task.save()

      return task
    } catch (error) {
      throw error
    }
  },

  async deleteTask(taskId, userId) {
    try {
      const task = await Task.findByPk(taskId)

      if (!task) {
        return null
      }

      if (task.userId !== userId) {
        return null
      }
      await task.destroy()
      return task
    } catch (error) {
      throw error
    }
  },
}

module.exports = TaskService
