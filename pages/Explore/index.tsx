// @ts-nocheck
import { useQuery, gql, useMutation } from '@apollo/client'

const LOGIN_MUTATION = gql`
  mutation Mutation($data: GetAccessTokenInput!) {
    getAccessToken(data: $data) {
      username
      password
      accessToken
    }
  }
`

export default function Countries() {
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION)
  console.log(data?.getAccessToken)
  if (loading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    console.error(error)
    return null
  }

  return (
    <div>
      <button
        onClick={() => {
          // addTodo()
          login({
            variables: {
              data: {
                username: 'pansy_murphy',
                password: 'qweqweqwe',
              },
            },
          })
        }}
      >
        click
      </button>
    </div>
  )
}

//0832 896 214