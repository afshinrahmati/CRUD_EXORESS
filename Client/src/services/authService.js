// src/services/authService.js
import axios from 'axios'

export function login(email, password) {
    return axios.post('/api/auth/login', { email, password })
}

export function signup(email, password) {
    return axios.post('/api/auth/signup', { email, password })
}
