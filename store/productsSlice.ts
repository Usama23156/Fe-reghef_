import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/api/client";
import type { product } from '@/types/products';


export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const { data, error } = await supabase
      .from("product")
      .select("*");

    if (error) throw error;
    return data;
  }
);

interface ProductsState {
  products: product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: true,
  error: null
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching products";
      });
  }
});

export default productsSlice.reducer;