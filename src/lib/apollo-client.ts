import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ErrorLink } from '@apollo/client/link/error'
import { CombinedGraphQLErrors } from '@apollo/client/errors'

// GraphQL endpoint - update this to your Django GraphQL endpoint
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:8000/graphql/',
  credentials: 'include', // Include cookies for Django session-based auth
})

// Auth link to add token to headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('auth_token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

// Error link for handling GraphQL errors
const errorLink = new ErrorLink(({ error }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path }: { message: string; locations?: any; path?: any }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    })
  } else {
    console.error(`[Network error]: ${error}`)
    
    // Handle 401 Unauthorized - redirect to login
    const networkErr = error as any
    if (networkErr.statusCode === 401 || networkErr.status === 401) {
      localStorage.removeItem('auth_token')
      window.location.href = '/admin/login'
    }
  }
})

// Create Apollo Client
export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
})

