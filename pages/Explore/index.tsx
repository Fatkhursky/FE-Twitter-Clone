// @ts-nocheck
import { useQuery, gql, useMutation } from '@apollo/client'

const ADD_TODO = gql`
  mutation Mutation($data: GetAccessTokenInput!) {
    getAccessToken(data: $data) {
      username
      password
      accessToken
    }
  }
`

export default function Countries() {
  const [addTodo, { data, loading, error }] = useMutation(ADD_TODO)
  console.log(data, loading, error)
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
          addTodo({
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
