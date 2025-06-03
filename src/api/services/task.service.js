import Task from '../models/task.model.js';
import ApiError from '../../utils/apiError.js';

class TaskService {
  async createTask(userId, taskData) {
    return Task.create({ ...taskData, owner: userId });
  }

  async getTasks(userId, filters = {}) {
    const match = { owner: userId };
    if (filters.status) match.status = filters.status;

    return Task.find(match)
      .sort({ createdAt: -1 })
      .skip(parseInt(filters.skip) || 0)
      .limit(parseInt(filters.limit) || 10);
  }

  async updateTask(userId, taskId, updates) {
    const task = await Task.findOne({ _id: taskId, owner: userId });
    if (!task) throw new ApiError(404, 'Task not found');

    Object.assign(task, updates);
    return task.save();
  }

  async deleteTask(userId, taskId) {
    const task = await Task.findOneAndDelete({ _id: taskId, owner: userId });
    if (!task) throw new ApiError(404, 'Task not found');
    return task;
  }
}

export default new TaskService();
