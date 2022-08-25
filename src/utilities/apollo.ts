//@ts-nocheck
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('Bearer');
  // console.log(token,5678)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `${token}`
  }
}});



const httpLink = createHttpLink({
  uri: 'https://l210526-twitter-clone-be.herokuapp.com/graphql',
});

// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache()
// });

const client = new ApolloClient({
  link: authLink.concat(httpLink), 
  cache: new InMemoryCache()
});
export { client, httpLink, authLink }