import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let index = null;
      index = current(state.products).findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.selectColor === action.payload.selectColor &&
          item.selectMemory === action.payload.selectMemory,
      );
      // console.log(index);
      if (index >= 0) {
        state.products[index].quantity += action.payload.quantity;
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

    updateCartItemQuantity: (state, action) => {
      const { index, quantity } = action.payload;

      state.products[index].quantity += quantity;
    },
  },
});

export const { addToCart, removeItem, resetCart, updateCartItemQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
