import { createContext, useContext, useState, type ReactNode } from 'react'

interface AuthValue {
  user: string | null
  login: (username: string, password: string) => boolean
  logout: () => void
}
const AuthContext = createContext<AuthValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(() => localStorage.getItem('shopmini-user'))
  const login = (username: string, password: string) => {
    if (!username.trim() || password !== '123456') return false
    localStorage.setItem('shopmini-user', username)
    setUser(username)
    return true
  }
  const logout = () => {
    localStorage.removeItem('shopmini-user')
    setUser(null)
  }
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used inside AuthProvider')
  return value
}
