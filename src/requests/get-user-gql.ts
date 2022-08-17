import { setContext } from '@apollo/client/link/context'
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('Bearer');
    console.log(token,5678)
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: `${token}`
    }
  }});
  

  export default authLink