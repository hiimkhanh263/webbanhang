import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // const item = state.products.find((item) => item.id === action.payload.id);

      // const color = state.products.attributes?.colors.data.forEach(
      //   (color) => (color.id = action.payload.id),
      // );

      const item = state.products.find((item) => item.id === action.payload.id);

      const color = state.products.filter(
        (color) =>
          color.attributes?.colors.data.id ===
          action.payload.attributes?.colors.data.id,
      );

      const memory = state.products.filter(
        (memory) =>
          memory.attributes?.memories.data.id ===
          action.payload.attributes?.memories.data.id,
      );

      if (item && color && memory) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },

    removeItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload,
      );
    },

    resetCart: (state) => {
      state.products = [];
    },

    updateCart: (state, action) => {},
  },
});

export const { addToCart, removeItem, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
