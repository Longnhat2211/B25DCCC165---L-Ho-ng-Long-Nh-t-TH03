import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Product } from '../../types'

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('https://fakestoreapi.com/products')
  if (!response.ok) throw new Error('Không thể tải danh sách sản phẩm')
  return (await response.json()) as Product[]
})

interface ProductsState { items: Product[]; loading: boolean; error: string | null }
const initialState: ProductsState = { items: [], loading: false, error: null }

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.items = action.payload })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? 'Đã xảy ra lỗi' })
  },
})
export default productsSlice.reducer
