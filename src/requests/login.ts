import api from '@/src/utilities/axios'

type LoginFn = (data: { username: string; phone: string; password: string }) => Promise<[error: any, data: any]>

const login: LoginFn = async ({ username, phone, password }) => {
  try {
    const response = await api.post(`auth/login`, { username, phone, password })
    //console.log(33333, response.data.data.accessToken)
    return [null, response]
  } catch (e) {
    return [e, null]
  }
}
export default login
