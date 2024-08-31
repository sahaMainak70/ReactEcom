import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: [],
    reducers: {
        addToWishlist: (state, action) => {
            let isAvailableOnWishlist = false;

            state.map((item) => {
                if (item.id == action.payload.id) {
                    isAvailableOnWishlist = true;
                }
            });

            if (!isAvailableOnWishlist) {
                state = [...state, action.payload];
            }
            console.log(state);
            
            return state;
        },
        removeFromWishlist: (state, action) => {
            state = state.filter((item) => item.id !== action.payload.id);
            return state;
        },
    },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;