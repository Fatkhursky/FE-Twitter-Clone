import { gql } from '@apollo/client'
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

// Get user data
export const DATAUSER_QUERY = gql`
  query User($where: UserWhereUniqueInput!) {
    user(where: $where) {
      username
      created_at
      id
      name
    }
  }
`

// Add new tweet
export const createOneTweet = gql`
  mutation CreateOneTweet($data: TweetCreateInput!) {
    createOneTweet(data: $data) {
      id
      content
      user {
        username
        name
      }
    }
  }
`
//Delete some tweet
export const deleteSomeTweet = gql`
  mutation DeleteOneTweet($where: TweetWhereUniqueInput!) {
    deleteOneTweet(where: $where) {
      id
    }
  }
`

//Get all tweet
export const GET_TWEETS = gql`
  query Tweets($where: TweetWhereInput) {
    tweets(where: $where, orderBy: { created_at: desc }) {
      id
      content
      user {
        name
        username
      }
    }
  }
`

export const GET_ACCESS_TOKEN = gql`
  mutation fdsdf($data: GetAccessTokenInput!) {
    getAccessToken(data: $data) {
      id
      name
      email
      username
      created_at
      accessToken
      refreshToken
    }
  }
`
