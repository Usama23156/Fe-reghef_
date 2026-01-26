import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  image: string;
  name_ar: string;
  name_en: string;
  price: number;
  box_size?: number;
}

interface BoxItems {
  kofta: number;
  shish: number;
  hawawshi: number;
}

export interface CartItem {
  product: Product;
  count: number;
  totalPrice: number;
  details?: BoxItems; // موجودة لو البوكس
}

interface CartState {
  products: CartItem[];
}

// Load cart from localStorage if available
const initialState: CartState = {
  products:
    typeof window !== "undefined" && localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")!)
      : [],
};

// Async thunk to save cart to user in DB
export const saveCartToUser = createAsyncThunk(
  "cart/saveCartToUser",
  async ({ userId, cart }: { userId: string; cart: CartItem[] }) => {
    const res = await fetch("/api/save-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, cart }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to save cart");
    }

    const data = await res.json();
    return data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (
      state,
      action: PayloadAction<{ product: Product; count: number; details?: BoxItems }>
    ) => {
      const { product, count, details } = action.payload;

      // ابحث لو نفس المنتج موجود مع نفس التفاصيل
      const existingItem = state.products.find(
        (item) =>
          item.product.id === product.id &&
          JSON.stringify(item.details) === JSON.stringify(details)
      );

      const itemTotal = product.price * count;

      if (existingItem) {
        existingItem.count += count;
        existingItem.totalPrice += itemTotal;
      } else {
        state.products.push({ product, count, details, totalPrice: itemTotal });
      }

      localStorage.setItem("cart", JSON.stringify(state.products));
    },

    increase(state, action: PayloadAction<CartItem>) {
      const item = state.products.find(
        (i) =>
          i.product.id === action.payload.product.id &&
          JSON.stringify(i.details) === JSON.stringify(action.payload.details)
      );
      if (item) {
        item.count += 1;
        item.totalPrice += item.product.price;
        localStorage.setItem("cart", JSON.stringify(state.products));
      }
    },

    decrease(state, action: PayloadAction<CartItem>) {
      const item = state.products.find(
        (i) =>
          i.product.id === action.payload.product.id &&
          JSON.stringify(i.details) === JSON.stringify(action.payload.details)
      );
      if (item && item.count > 1) {
        item.count -= 1;
        item.totalPrice -= item.product.price;
        localStorage.setItem("cart", JSON.stringify(state.products));
      }
    },

    removeItem(state, action: PayloadAction<CartItem>) {
      state.products = state.products.filter(
        (i) =>
          !(
            i.product.id === action.payload.product.id &&
            JSON.stringify(i.details) === JSON.stringify(action.payload.details)
          )
      );
      localStorage.setItem("cart", JSON.stringify(state.products));
    },

    cleanUpCart(state) {
      state.products = [];
      localStorage.removeItem("cart");
    },

    setCart(state, action: PayloadAction<CartItem[]>) {
      state.products = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
  },
});

export const { addCart, removeItem, increase, decrease, cleanUpCart, setCart } =
  cartSlice.actions;

export default cartSlice.reducer;
