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
      action: PayloadAction<{ product: Product; quantity: number | BoxItems }>
    ) => {
      const { product, quantity } = action.payload;

      const isBox = typeof quantity === "object"; // بوكس ولا ساندويتش فردي

      if (isBox) {
        // البوكس يتعامل كعنصر واحد
        const existingBox = state.products.find(
          (item) =>
            item.product.id === product.id &&
            JSON.stringify(item.details) === JSON.stringify(quantity)
        );

        if (existingBox) {
          existingBox.count += 1; // زود عدد البوكسات بمقدار 1
          existingBox.totalPrice += product.price; // سعر بوكس واحد
        } else {
          state.products.push({
            product,
            count: 1,
            totalPrice: product.price,
            details: quantity,
          });
        }
      } else {
        // ساندويتش فردي
        const existingItem = state.products.find(
          (item) =>
            item.product.id === product.id &&
            !item.details // مش بوكس
        );

        if (existingItem) {
          existingItem.count += quantity;
          existingItem.totalPrice += product.price * quantity;
        } else {
          state.products.push({
            product,
            count: quantity,
            totalPrice: product.price * quantity,
          });
        }
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