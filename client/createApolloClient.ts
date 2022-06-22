import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from '@apollo/client'

const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const link = createHttpLink({
    uri: '/graphql',
    credentials: 'same-origin',
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  })
}

export default createApolloClient
