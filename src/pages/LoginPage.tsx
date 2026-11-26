import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!login(username, password)) {
      setError('Tên đăng nhập không được trống và mật khẩu là 123456')
      return
    }
    const from = (location.state as { from?: string } | null)?.from ?? '/'
    navigate(from, { replace: true })
  }
  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <h1>Đăng nhập</h1>
        <p>Chào mừng bạn quay lại ShopMini.</p>
        {error && <div className="form-error">{error}</div>}
        <label>Tên đăng nhập<input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nhập tên đăng nhập" /></label>
        <label>Mật khẩu<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="123456" /></label>
        <button className="primary-button" type="submit">Đăng nhập</button>
      </form>
    </div>
  )
}
