import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '@/api/client'
import { Category } from "@/types/category"

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetch',
  async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
    if (error) throw error

    return data as Category[]
  }
)

interface CategoryState {
  data: Category[]
  loading: boolean
}

const initialState: CategoryState = {
  data: [],
  loading: true,
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.loading = true
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.data = action.payload
        state.loading = false
      })
  },
})

export default categoriesSlice.reducer