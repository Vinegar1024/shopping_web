import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    cartItems: [],
    searchTerm: "",
    totalQuantity: 0,
    totalPrice: 0,
    change: false,
  },
  reducers: {
    searchProduct(state, action) {
      const searchTerm = action.payload.searchTerm;
      state.items = state.items.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      state.searchTerm = action.payload.searchTerm;
      // state.change = true;
    },
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    updateItem(state, action) {
      const { type, id, newValue } = action.payload;
      let modifyIndex = 0;
      const existingItem = state.items.find((item, i) => {
        if (item.id === id) {
          modifyIndex = i;
          return true;
        }
      });
      state.change = true;
      existingItem[type] = newValue;
      state.items[modifyIndex] = existingItem;
    },
    addItem(state, action) {
      const newItem = action.payload;
      state.change = true;
      state.items.push({
        id: newItem.id,
        price: newItem.price,
        quantity: +newItem.quantity,
        name: newItem.name,
        visibility: newItem.visibility,
      });
    },
    updateCartItems(state, action) {
      let modifyIndex = 0;
      const { add, id, name, price } = action.payload;
      const existingItemInCart = state.cartItems.find((item) => item.id === id);
      const existingItem = state.items.find((item, i) => {
        if (item.id === id) {
          modifyIndex = i;
          return true;
        }
      });
      if (add) {
        if (existingItem.quantity === 0) return;
        existingItem.quantity--;
        if (!existingItemInCart) {
          state.cartItems.push({
            id: id,
            name: name,
            price: price,
            quantity: 1,
          });
        } else {
          existingItemInCart.quantity++;
        }
        state.totalPrice += +price;
      } else {
        existingItem.quantity++;
        existingItemInCart.quantity--;
        state.totalPrice -= +price;
      }
      state.items[modifyIndex] = existingItem;
      state.change = true;
    },
    deleteCartItem(state, action) {
      let modifyIndex = 0;
      const { id, price } = action.payload;
      const updatedCartItems = state.cartItems.filter((item) => item.id !== id);
      const existingItem = state.items.find((item, i) => {
        if (item.id === id) {
          modifyIndex = i;
          return true;
        }
      });
      existingItem.quantity++;
      state.items[modifyIndex] = existingItem;
      state.totalPrice -= +price;
      state.change = true;
      state.cartItems = updatedCartItems;
    },
    // unused
    deleteItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.change = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
