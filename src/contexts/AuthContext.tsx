import { createContext, useContext, useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client/react'
import { LOGIN_MUTATION } from '../graphql/mutations'
import { ME_QUERY } from '../graphql/queries'
import type { ReactNode } from 'react'

interface User {
  id: string
  username: string
  email: string
  role: string
  isAdmin: boolean
}

interface LoginResponse {
  login: {
    success: boolean
    message?: string
    token?: string
    user?: User
  }
}

interface MeResponse {
  me: User
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check authentication status on mount using ME_QUERY
  const { data: meData, loading: meLoading, error: meError, refetch: refetchMe } = useQuery(ME_QUERY, {
    errorPolicy: 'ignore', // Don't throw on error, just handle it
    fetchPolicy: 'network-only', // Always check with server
  })

  // Login mutation
  const [loginMutation, { loading: loginLoading }] = useMutation(LOGIN_MUTATION)

  // Check if user is authenticated based on ME_QUERY result
  useEffect(() => {
    if (!meLoading) {
      const response = meData as MeResponse | undefined
      if (response?.me) {
        setIsAuthenticated(true)
        setUser(response.me)
      } else {
        setIsAuthenticated(false)
        setUser(null)
        // Clear any stored auth data
        localStorage.removeItem('auth_token')
      }
      setIsLoading(false)
    }
  }, [meData, meLoading, meError])

  const login = async (username: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const { data } = await loginMutation({
        variables: {
          input: {
            username,
            password,
          },
        },
      })

      const response = data as LoginResponse | undefined

      if (response?.login?.success) {
        // If there's a token in the response, store it
        if (response.login.token) {
          localStorage.setItem('auth_token', response.login.token)
        }
        
        // Set user data immediately
        if (response.login.user) {
          setUser(response.login.user)
          setIsAuthenticated(true)
        }

        // Refetch ME_QUERY to verify authentication and get latest user data
        try {
          await refetchMe()
        } catch (error) {
          console.error('Error refetching user data:', error)
        }

        return { success: true, message: response.login.message }
      } else {
        return { success: false, message: response?.login?.message || 'Login failed' }
      }
    } catch (error: any) {
      console.error('Login error:', error)
      const errorMessage = error.graphQLErrors?.[0]?.message || error.message || 'Login failed. Please try again.'
      return { success: false, message: errorMessage }
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('auth_token')
    // Optionally call a logout mutation if your backend has one
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading: isLoading || meLoading || loginLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

