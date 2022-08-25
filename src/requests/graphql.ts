
import { useQuery, gql, useMutation } from '@apollo/client'
//Login
export const LOGIN_MUTATION = gql`
  mutation Mutation($data: GetAccessTokenInput!) {
    getAccessToken(data: $data) {
      phone
      password
      accessToken
      username
      name
      created_at
    }
  }
`
// Register 
export const REGISTER_MUTATION = gql`
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

// Add new tweet
export const createOneTweet = gql `
mutation CreateOneTweet($data: TweetCreateInput!) {
  createOneTweet(data: $data) {
    content
  }
}
` 

