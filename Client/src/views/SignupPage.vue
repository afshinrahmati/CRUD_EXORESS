<template>
  <div class="signup-page">
    <h2>📝 Sign Up</h2>
    <form @submit.prevent="signup">
      <input v-model="name" type="text" placeholder="Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SignupPage',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async signup() {
      try {
        const response = await axios.post('/auth/signup', {
          username: this.name,
          email: this.email,
          password: this.password
        })

        if (response.status === 201) {
          // Redirect to login after successful signup
          this.$router.push('/login')
        }
      } catch (err) {
        this.error = err.response?.data?.message || 'Signup failed.'
      }
    }
  }
}
</script>

<style scoped>
.signup-page {
  padding: 20px;
  max-width: 400px;
  margin: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}
input {
  display: block;
  margin-bottom: 12px;
  padding: 10px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
}
button {
  padding: 10px 16px;
  background-color: #2d8cf0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #1c6cd9;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
