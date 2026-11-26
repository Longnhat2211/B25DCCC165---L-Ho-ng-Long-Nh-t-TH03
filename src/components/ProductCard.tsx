import { Link } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'
import type { Product } from '../types'
import { useAppDispatch } from '../hooks'
import { addToCart } from '../features/cart/cartSlice'

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch()
  return (
    <article className="product-card">
      <Link className="product-image" to={`/products/${product.id}`}>
        <img src={product.image} alt={product.title} />
      </Link>
      <div className="product-body">
        <p className="product-category">{product.category}</p>
        <Link className="product-title" to={`/products/${product.id}`}>{product.title}</Link>
        <div className="product-footer">
          <strong>${product.price.toFixed(2)}</strong>
          <button onClick={() => dispatch(addToCart(product))} aria-label={`Thêm ${product.title}`}>
            <FiShoppingCart /> Thêm
          </button>
        </div>
      </div>
    </article>
  )
}
