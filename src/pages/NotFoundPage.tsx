import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return <div className="container empty-state"><h1>404</h1><p>Trang bạn tìm kiếm không tồn tại.</p><Link className="primary-button" to="/">Về trang chủ</Link></div>
}
