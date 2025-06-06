<template>
  <div class="task-form">
    <h2>Create a New Task</h2>
    <form @submit.prevent="createTask">
      <input v-model="title" type="text" placeholder="Task Title" required />
      <textarea v-model="description" placeholder="Task Description" required></textarea>
      <button type="submit">Create Task</button>
      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      description: '',
      message: '',
      error: ''
    };
  },
  methods: {
    async createTask() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.post(
            '/tasks',
            {
              title: this.title,
              description: this.description
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
        );
        this.message = '✅ Task created!';
        this.error = '';
        this.title = '';
        this.description = '';
      } catch (err) {
        this.message = '';
        this.error = err.response?.data?.message || '❌ Failed to create task';
      }
    }
  }
};
</script>

<style scoped>
.task-form {
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 20px;
  max-width: 400px;
  margin: auto;
  background: #f9f9f9;
}
input,
textarea {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #aaa;
}
button {
  padding: 10px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.success {
  color: green;
}
.error {
  color: red;
}
</style>
