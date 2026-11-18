import { reqres } from '@/lib/axios'
import type { LoginValues } from './schema'

export interface ReqresUser {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

export async function login(values: LoginValues): Promise<string> {
  const { data } = await reqres.post<{ token: string }>('/login', values)
  return data.token
}

export async function getUserByEmail(email: string): Promise<ReqresUser | null> {
  const { data } = await reqres.get<{ data: ReqresUser[] }>('/users', { params: { per_page: 12 } })
  return data.data.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null
}
