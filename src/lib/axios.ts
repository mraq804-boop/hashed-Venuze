import axios from 'axios'
import { useAuthStore } from '@/features/auth/store'

export const REQRES_API_KEY = process.env.NEXT_PUBLIC_REQRES_API_KEY ?? 'reqres-free-v1'

export const reqres = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: { 'x-api-key': REQRES_API_KEY },
  timeout: 15_000,
})

reqres.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

reqres.interceptors.response.use(undefined, (error) => {
  const isLogin = String(error?.config?.url ?? '').includes('/login')
  if (error?.response?.status === 401 && !isLogin && useAuthStore.getState().token) {
    useAuthStore.getState().logout()
  }
  return Promise.reject(error)
})
