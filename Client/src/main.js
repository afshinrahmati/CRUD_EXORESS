import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/api'; // or whatever your backend base is

createApp(App).use(router).mount('#app')
