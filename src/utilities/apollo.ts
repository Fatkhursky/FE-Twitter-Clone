//@ts-nocheck
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://l210526-twitter-clone-be.herokuapp.com/graphql',
});

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo3LCJuYW1lIjoiSmVhbmllIFdhZWxjaGkiLCJlbWFpbCI6ImplYW5pZS53YWVsY2hpQGV4YW1wbGUuY29tIn0sImlhdCI6MTY2MDM4NDE0MiwiZXhwIjoxNjYwNDcwNTQyfQ.3idFSFq330D48HvcFZtX3C5PCBVXBuDfwOwDPVEJu9E`
//     }
//   }
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache()
// });


const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});
export { client, httpLink }