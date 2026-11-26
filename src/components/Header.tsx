import { Link, NavLink } from 'react-router-dom'
import { FiMoon, FiShoppingCart, FiSun, FiUser } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { useAppSelector } from '../hooks'

export default function Header() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const count = useAppSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0))

  return (
    <header className="header">
      <div className="header-inner">
        <Link className="brand" to="/">Shop<span>Mini</span></Link>
        <nav className="nav">
          <NavLink to="/">Trang chủ</NavLink>
          <NavLink to="/cart">Giỏ hàng</NavLink>
        </nav>
        <div className="header-actions">
          <button className="icon-button" onClick={toggleTheme} aria-label="Đổi theme">
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </button>
          {user ? (
            <button className="user-button" onClick={logout}><FiUser /> {user}</button>
          ) : (
            <Link className="icon-button" to="/login" aria-label="Đăng nhập"><FiUser /></Link>
          )}
          <Link className="cart-button" to="/cart"><FiShoppingCart /><span>{count}</span></Link>
        </div>
      </div>
    </header>
  )
}
