<template>
  <div class="task-box">
    <h3>Create Task</h3>
    <form @submit.prevent="createTask">
      <input v-model="title" placeholder="Title" required />
      <input v-model="description" placeholder="Description" required />
      <button type="submit">Create</button>
      <p v-if="error" style="color:red">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      title: '',
      description: '',
      error: ''
    }
  },
  methods: {
    async createTask() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.error = 'Not logged in.'
        return
      }

      try {
        await axios.post('/tasks', {
          title: this.title,
          description: this.description
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        this.title = ''
        this.description = ''
        this.error = ''
        alert('✅ Task created!')
      } catch (err) {
        this.error = err.response?.data?.error || 'Failed to create task'
      }
    }
  }
}
</script>

<style scoped>
.task-box {
  border: 1px solid #ccc;
  padding: 1rem;
  max-width: 400px;
  border-radius: 8px;
  margin-top: 20px;
}
input {
  display: block;
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
}
button {
  padding: 8px 16px;
}
</style>
