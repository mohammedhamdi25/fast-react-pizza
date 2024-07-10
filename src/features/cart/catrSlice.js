import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    DeleteItemCart(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseNumItem(state, action) {
      let item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseNumItem(state, action) {
      let item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;

      if (item.quantity === 0)
        cartSlice.caseReducers.DeleteItemCart(state, action);
    },
    clearCart(state, action) {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;

export const {
  addItem,
  DeleteItemCart,
  increaseNumItem,
  decreaseNumItem,
  clearCart,
} = cartSlice.actions;

export const getCartItems = (store) => store.cart.cart;

export const getNumPizzas = (store) =>
  store.cart.cart.reduce((per, cur) => per + cur.quantity, 0);

export const getTotalPrice = (store) =>
  store.cart.cart.reduce((per, cur) => per + cur.totalPrice, 0);

export const getCurrentQuantityItem = (id) => (store) =>
  store.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
