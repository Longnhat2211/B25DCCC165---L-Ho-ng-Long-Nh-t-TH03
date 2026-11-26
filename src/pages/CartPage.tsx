import { Link } from 'react-router-dom'
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '../hooks'
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice'

export default function CartPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  if (!items.length) {
    return <div className="container empty-state"><h1>Giỏ hàng trống</h1><p>Hãy chọn thêm những món đồ bạn yêu thích.</p><Link className="primary-button" to="/">Tiếp tục mua sắm</Link></div>
  }
  return (
    <div className="container cart-page">
      <h1>Giỏ hàng của bạn</h1>
      <div className="cart-layout">
        <div className="cart-list">
          {items.map((item) => (
            <div className="cart-item" key={item.product.id}>
              <img src={item.product.image} alt={item.product.title} />
              <div className="cart-item-info"><h3>{item.product.title}</h3><strong>${item.product.price.toFixed(2)}</strong></div>
              <div className="quantity">
                <button onClick={() => dispatch(updateQuantity({ id: item.product.id, quantity: item.quantity - 1 }))}><FiMinus /></button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(updateQuantity({ id: item.product.id, quantity: item.quantity + 1 }))}><FiPlus /></button>
              </div>
              <button className="remove-button" onClick={() => dispatch(removeFromCart(item.product.id))}><FiTrash2 /></button>
            </div>
          ))}
        </div>
        <aside className="order-summary">
          <h2>Tóm tắt đơn hàng</h2>
          <div><span>Tạm tính</span><strong>${total.toFixed(2)}</strong></div>
          <div><span>Phí vận chuyển</span><strong>Miễn phí</strong></div>
          <hr />
          <div className="grand-total"><span>Tổng cộng</span><strong>${total.toFixed(2)}</strong></div>
          <Link className="primary-button" to="/checkout">Tiến hành thanh toán</Link>
        </aside>
      </div>
    </div>
  )
}
