<template>
  <div class="task-box">
    <h2>📝 My Tasks</h2>

    <!-- Show loading text while tasks are being fetched -->
    <div v-if="loading">Loading...</div>

    <!-- Show message if there are no tasks -->
    <div v-else-if="tasks.length === 0">No tasks yet.</div>

    <!-- Show task list if tasks exist -->
    <ul v-else>
      <li v-for="task in tasks" :key="task._id" class="task-item">
        <!-- Display the task title, fallback in case it's nested -->
        <h3>{{ task.title || task.task?.title || 'No Title' }}</h3>

        <!-- Display the task description, fallback in case it's nested -->
        <p>{{ task.description || task.task?.description || 'No Description' }}</p>

        <!-- Display the task status -->
        <small>Status: {{ task.status || 'unknown' }}</small>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    console.log(858)
    return {
      tasks: [],     // This holds the array of tasks
      loading: true  // Controls the loading state
    }
  },
  async mounted() {
    // Get the saved token from localStorage
    const token = localStorage.getItem('token')
    console.log('Token:', token)

    // If no token, show alert and stop
    if (!token) {
      alert('Not authenticated')
      return
    }

    try {
      // Make GET request to fetch tasks with authorization header
      const response = await axios.get('/tasks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      // Log the response and set tasks array
      console.log('Fetched tasks:', response.data)
      this.tasks = response.data
    } catch (err) {
      console.error(err)
      alert('Failed to load tasks')
    } finally {
      // Stop loading after request completes (success or error)
      this.loading = false
    }
  }
}
</script>

<style scoped>
/* Container styling */
.task-box {
  background: #fefefe;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 5px #ccc;
  max-width: 600px;
  margin: 2rem auto;
}

/* Each task item styling */
.task-item {
  background: #f8f8f8;
  padding: 0.8rem;
  border-radius: 6px;
  margin-bottom: 1rem;
}
</style>
