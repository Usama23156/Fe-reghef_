import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

interface CartItem {
  product: Product;
  count: number;        // عدد العناصر في الكارت
  totalPrice: number;
  details?: BoxItems;   // موجودة بس في حالة البوكس
}

interface CartState {
  products: CartItem[];
}

const initialState: CartState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (
  state,
  action: PayloadAction<{
    product: Product;
    count: number;
    details?: BoxItems;
  }>
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
    state.products.push({
      product,
      count,
      details,
      totalPrice: itemTotal,
    });
  }
},
    increase(state, action: PayloadAction<Product>) {
      const item = state.products.find(
        (item) => item.product.id === action.payload.id
      );

      if (item) {
        item.count += 1;
        item.totalPrice += action.payload.price;
      }
    },

    decrease(state, action: PayloadAction<Product>) {
      const item = state.products.find(
        (item) => item.product.id === action.payload.id
      );

      if (item && item.count > 1) {
        item.count -= 1;
        item.totalPrice -= action.payload.price;
      }
    },

    removeItem(state, action: PayloadAction<Product>) {
      state.products = state.products.filter(
        (item) => item.product.id !== action.payload.id
      );
    },

    cleanUpCart(state) {
      state.products = [];
    },
  },
});

export const { addCart, removeItem, increase, decrease, cleanUpCart } =
  cartSlice.actions;
export default cartSlice.reducer;