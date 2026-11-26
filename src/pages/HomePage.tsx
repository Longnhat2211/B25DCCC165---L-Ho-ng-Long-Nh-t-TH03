import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { fetchProducts } from '../features/products/productsSlice'
import { useAppDispatch, useAppSelector } from '../hooks'

export default function HomePage() {
  const dispatch = useAppDispatch()
  const { items, loading, error } = useAppSelector((state) => state.products)
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => { if (!items.length) dispatch(fetchProducts()) }, [dispatch, items.length])
  const categories = useMemo(() => ['all', ...new Set(items.map((item) => item.category))], [items])
  const filtered = items.filter((item) =>
    (category === 'all' || item.category === category) &&
    item.title.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="container">
      <section className="hero-banner">
        <div>
          <p>Khám phá xu hướng mới</p>
          <h1>Shopping made simple.</h1>
          <span>Sản phẩm chất lượng, giá tốt mỗi ngày.</span>
        </div>
      </section>
      <div className="toolbar">
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tìm kiếm sản phẩm..." />
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((name) => <option key={name} value={name}>{name === 'all' ? 'Tất cả danh mục' : name}</option>)}
        </select>
      </div>
      {loading && <p className="status">Đang tải sản phẩm...</p>}
      {error && <p className="status error">{error}</p>}
      <div className="product-grid">
        {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  )
}
