import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      let isAvailableOnCart = false;

      state.map((item) => {
        if (item.id == action.payload.id) {
          isAvailableOnCart = true;
        }
      });

      if (isAvailableOnCart) {
        state.map((item) => {
          if (item.id === action.payload.id) {
            item.qty += 1;
          }
        });
      } else {
        action.payload.qty = 1;
        state = [...state, action.payload];
      }
      return state;
    },
    removeFromCart: (state, action) => {
      state = action.payload;
      console.log(state);

      return state;
    },
    qtyIncreament: (state, action) => {
      state.map((item) => {
        if (item.id === action.payload) {
          item.qty += 1;
        }
      });
    },
    qtyDecreament: (state, action) => {
      state.map((item) => {
        if (item.id === action.payload) {
          item.qty -= 1;
        }
      });
    },
  },
});

export const { addToCart, removeFromCart, qtyIncreament, qtyDecreament } =
  cartSlice.actions;
export default cartSlice.reducer;
