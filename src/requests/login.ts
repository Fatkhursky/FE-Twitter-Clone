import api from '@/src/utilities/axios'

type LoginFn = (data: { username: string; password: string }) => Promise<[error: any, data: any]>

const login: LoginFn = async ({ username, password }) => {
  try {
    const response = await api.post(`auth/login`, { username, password })
    console.log(33333, response)
    return [null, response]
  } catch (e) {
    return [e, null]
  }
}
export default login
