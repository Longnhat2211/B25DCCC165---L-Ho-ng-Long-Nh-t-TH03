import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks'
import { clearCart } from '../features/cart/cartSlice'

export default function CheckoutPage() {
  const items = useAppSelector((state) => state.cart.items)
  const dispatch = useAppDispatch()
  const [complete, setComplete] = useState(false)
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  if (!items.length && !complete) return <Navigate to="/cart" replace />
  const submit = (event: FormEvent) => {
    event.preventDefault()
    dispatch(clearCart())
    setComplete(true)
  }

  if (complete) {
    return <div className="container success-state"><div>✓</div><h1>Đặt hàng thành công!</h1><p>Cảm ơn bạn đã mua sắm tại ShopMini.</p></div>
  }
  return (
    <div className="container checkout-page">
      <h1>Thanh toán</h1>
      <form className="checkout-layout" onSubmit={submit}>
        <section className="checkout-form">
          <h2>Thông tin giao hàng</h2>
          <div className="form-grid">
            <label>Họ và tên<input required /></label>
            <label>Số điện thoại<input required /></label>
            <label className="full">Địa chỉ<input required /></label>
          </div>
        </section>
        <aside className="order-summary">
          <h2>Đơn hàng ({items.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm)</h2>
          {items.map((item) => <div className="checkout-row" key={item.product.id}><span>{item.product.title} × {item.quantity}</span><strong>${(item.product.price * item.quantity).toFixed(2)}</strong></div>)}
          <hr /><div className="grand-total"><span>Tổng cộng</span><strong>${total.toFixed(2)}</strong></div>
          <button className="primary-button" type="submit">Đặt hàng</button>
        </aside>
      </form>
    </div>
  )
}
