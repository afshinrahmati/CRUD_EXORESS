<template>
  <div class="task-list">
    <h3>📋 My Tasks</h3>

    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="tasks.length === 0">No tasks found.</div>

    <ul v-else>
      <li v-for="task in tasks" :key="task._id" class="task-item">
        <h4>{{ task.title }}</h4>
        <p>{{ task.description }}</p>
        <p>Status: <strong>{{ task.status }}</strong></p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      tasks: [],
      error: ''
    }
  },
  async mounted() {
    const token = localStorage.getItem('token')
    if (!token) {
      this.error = 'Not authenticated'
      return
    }

    try {
      const response = await axios.get('/tasks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      this.tasks = response.data.message
    } catch (err) {
      this.error = err.response?.data?.error || 'Failed to fetch tasks'
    }
  }
}
</script>

<style scoped>
.task-list {
  margin-top: 20px;
}
.task-item {
  border: 1px solid #ccc;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 8px;
}
.error {
  color: red;
}
</style>
