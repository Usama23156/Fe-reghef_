import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import categoriesReducer from './categorySlice'
import productsReducer from '@/store/productsSlice'
import authReducer from '@/store/authSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoriesReducer,
    products:productsReducer,
    auth:authReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;
