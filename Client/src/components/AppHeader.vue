<template>
  <header class="header">
    <nav class="nav">
      <h1 class="logo">🧠 Task App</h1>
      <ul class="nav-links">
        <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
        <li v-if="!isLoggedIn"><router-link to="/signup">Signup</router-link></li>
        <li v-if="isLoggedIn"><router-link to="/tasks">My Tasks</router-link></li>
        <li v-if="isLoggedIn"><a href="#" @click="logout">Logout</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false
    }
  },
  mounted() {
    this.isLoggedIn = !!localStorage.getItem('token')
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.isLoggedIn = false
      location.href = '#/login'
    }
  }
}
</script>

<style scoped>
.header {
  background: #4a90e2;
  padding: 1rem 2rem;
  color: white;
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  font-size: 1.5rem;
}
.nav-links {
  list-style: none;
  display: flex;
  gap: 1rem;
}
.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}
.nav-links a:hover {
  text-decoration: underline;
}
</style>
