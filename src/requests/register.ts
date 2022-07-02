// {
//   "fullname": "New User",
//   "dateOfBirth": "2022-1-1",
//   "username": "new_userq11111",
//   "password": "123456781q11",
//   "email": "newuser@twitteqr.com1111",
//   "phone": "0812461274341q111"
// }

import api from '@/src/utilities/axios'

type RegisterFn = (data: {
  fullname: string
  dateOfBirth: string
  username: string
  phone: string
}) => Promise<[error: any, data: any]>

const register: RegisterFn = async ({
  fullname,
  dateOfBirth,
  username,
  phone
}) => {
  try {
    const response = await api.post(`auth/register`, {
      fullname,
      dateOfBirth,
      username,
      phone
    })
    console.log(33333, response)
    return [null, response]
  } catch (e) {
    return [e, null]
  }
}
export default register
