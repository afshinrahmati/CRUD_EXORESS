import TaskService from '../services/task.service.js';
import { validationResult } from 'express-validator';
import ApiError from '../../utils/apiError.js';
import ApiResponse from '../../utils/apiResponse.js';

class TaskController {
  async createTask(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError(400, 'Validation error', errors.array());
      }

      const task = await TaskService.createTask(req.user._id, req.body);
      res.status(201).json(new ApiResponse(201, task, 'Task created successfully'));
    } catch (err) {
      next(err);
    }
  }

  async getTasks(req, res, next) {
    try {
      const tasks = await TaskService.getTasks(req.user._id, req.query);
      res.status(200).json(new ApiResponse(200, tasks, 'Tasks fetched successfully'));
    } catch (err) {
      next(err);
    }
  }

  async updateTask(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ApiError(400, 'Validation error', errors.array());
      }

      const updated = await TaskService.updateTask(req.user._id, req.params.id, req.body);
      res.status(200).json(new ApiResponse(200, updated, 'Task updated successfully'));
    } catch (err) {
      next(err);
    }
  }

  async deleteTask(req, res, next) {
    try {
      const task = await TaskService.deleteTask(req.user._id, req.params.id);
      res.status(200).json(new ApiResponse(200, task, 'Task deleted successfully'));
    } catch (err) {
      next(err);
    }
  }
}

export default new TaskController();
