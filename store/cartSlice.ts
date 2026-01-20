import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


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

interface Product {
  id: number;
  image: string;
  name: string;
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
  details?: BoxItems;
}

interface CartState {
  products: CartItem[];
}

const initialState: CartState = {
  products: typeof window !== "undefined" && localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")!)
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (
      state,
      action: PayloadAction<{ product: Product; count: number; details?: BoxItems }>
    ) => {
      const { product, count, details } = action.payload;
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

    increase(state, action: PayloadAction<Product>) {
      const item = state.products.find((i) => i.product.id === action.payload.id);
      if (item) {
        item.count += 1;
        item.totalPrice += action.payload.price;
        localStorage.setItem("cart", JSON.stringify(state.products));
      }
    },

    decrease(state, action: PayloadAction<Product>) {
      const item = state.products.find((i) => i.product.id === action.payload.id);
      if (item && item.count > 1) {
        item.count -= 1;
        item.totalPrice -= action.payload.price;
        localStorage.setItem("cart", JSON.stringify(state.products));
      }
    },

    removeItem(state, action: PayloadAction<Product>) {
      state.products = state.products.filter((i) => i.product.id !== action.payload.id);
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

    // saveCartToUser(state, action: PayloadAction<{ userId: string }>) {
    //   if (typeof window !== "undefined") {
    //     fetch("/api/save-cart", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ userId: action.payload.userId, cart: state.products }),
    //     }).catch((err) => console.error(err));
    //   }
    // },
  },
});

export const { addCart, removeItem, increase, decrease, cleanUpCart, setCart } =
  cartSlice.actions;
export default cartSlice.reducer;
