import React, { createContext, useCallback, useState, useContext } from 'react'
import api from '../services/api'

interface User {
  id: string
  name: string
  email: string
  avatar_url: string
  address_line?: string
  city?: string
  number?: string
  district?: string
  postal_code?: string
  complement?: string
  user_type?: string
  state: string
}

interface SignInCredentials {
  email: string
  password: string
}
interface AuthContextProps {
  user: User
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
  updateUser(user: User): void
}

interface AuthState {
  token: string
  user: User
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Ipet:token')
    const user = localStorage.getItem('@Ipet:user')

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`

      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    })

    const { token, user } = response.data

    localStorage.setItem('@Ipet:token', token)
    localStorage.setItem('@Ipet:user', JSON.stringify(user))

    api.defaults.headers.authorization = `Bearer ${token}`

    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@Ipet:token')
    localStorage.removeItem('@Ipet:user')
    setData({} as AuthState)
  }, [])

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@GoBarber:user', JSON.stringify(user))

      setData({
        token: data.token,
        user,
      })
    },
    [data.token]
  )

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextProps {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
