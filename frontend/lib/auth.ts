import api from './api'

export interface User {
  id: number
  username: string
  email: string
  is_active: boolean
  created_at: string
}

export interface LoginData {
  username: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
}

export const login = async (data: LoginData) => {
  const response = await api.post('/api/auth/login', data)
  if (response.data.access_token) {
    localStorage.setItem('token', response.data.access_token)
  }
  return response.data
}

export const register = async (data: RegisterData) => {
  const response = await api.post('/api/auth/register', data)
  return response.data
}

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get('/api/auth/me')
  return response.data
}

export const checkAuth = async (): Promise<boolean> => {
  const token = localStorage.getItem('token')
  if (!token) return false
  
  try {
    await getCurrentUser()
    return true
  } catch {
    return false
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  window.location.href = '/'
}

