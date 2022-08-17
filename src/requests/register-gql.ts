
import { useQuery, gql, useMutation } from '@apollo/client'

const REGISTER_MUTATION = gql`
mutation Mutation($data: UserCreateInput!) {
    register(data: $data) {
      name
      date_of_birth
      username
      phone
      password
    }
  }
`
export default REGISTER_MUTATION