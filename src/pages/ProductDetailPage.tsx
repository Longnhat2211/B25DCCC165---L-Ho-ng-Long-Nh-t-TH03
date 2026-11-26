import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchProducts } from '../features/products/productsSlice'
import { addToCart } from '../features/cart/cartSlice'

export default function ProductDetailPage() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { items, loading } = useAppSelector((state) => state.products)
  useEffect(() => { if (!items.length) dispatch(fetchProducts()) }, [dispatch, items.length])
  const product = items.find((item) => item.id === Number(id))

  if (loading) return <p className="status container">Đang tải...</p>
  if (!product) return <div className="container status"><p>Không tìm thấy sản phẩm.</p><Link to="/">Quay lại</Link></div>
  return (
    <div className="container detail-page">
      <Link className="back-link" to="/"><FiArrowLeft /> Quay lại</Link>
      <div className="detail-card">
        <div className="detail-image"><img src={product.image} alt={product.title} /></div>
        <div className="detail-info">
          <p className="product-category">{product.category}</p>
          <h1>{product.title}</h1>
          <strong className="detail-price">${product.price.toFixed(2)}</strong>
          <p className="detail-description">{product.description}</p>
          <button className="primary-button" onClick={() => dispatch(addToCart(product))}>
            <FiShoppingCart /> Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  )
}
