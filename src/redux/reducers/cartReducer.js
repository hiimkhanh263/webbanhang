import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);

      const color = state.products.attributes?.colors.data.forEach(
        (color) => (color.id = action.payload.id),
      );

      const memory = state.products?.attributes?.memories?.data?.forEach(
        (memory) =>
          (memory.id = action.payload?.attributes?.memories?.data?.id),
      );

      // console.log(memory);

      // if (item && color && memory) {
      //   item.quantity += action.payload.quantity;
      // } else {
      //   state.products.push(action.payload);
      // }

      if (item) {
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
