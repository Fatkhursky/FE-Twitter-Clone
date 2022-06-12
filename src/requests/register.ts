import api from '@/src/utilities/axios'

type RegisterFn = (data: {
  name: string
  username: string
  password: string
  email: string
  phone: string
}) => Promise<[error: any, data: any]>

const register: RegisterFn = async ({
  name,
  username,
  password,
  email,
  phone,
}) => {
  try {
    const response = await api.post(`auth/register`, {
      name,
      username,
      password,
      email,
      phone,
    })
    console.log(33333, response)
    return [null, response]
  } catch (e) {
    return [e, null]
  }
}
export default register
