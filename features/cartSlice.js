import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            if (state.items.some((item) => item._id === action.payload._id)) {
                const index = state.items.findIndex((item) => item._id === action.payload._id);
                state.items[index].quantity = state.items[index].quantity + action.payload.quantity;
            } else {
                state.items = [...state.items, action.payload]
            }
        },
        removeFromCart: (state, action) => {
            const index = state.items.findIndex((item) => item._id === action.payload._id);
            let newCart = [...state.items];
            if (index >= 0) {
                newCart.splice(index, 1);
            } else {
                console.warn(
                    `Can't remove product (id: ${action.payload.id} as its not in cart!`
                );
            }
            state.items = newCart;
        },
        addOneQuantity: (state, action) => {
            const index = state.items.findIndex((item) => item._id === action.payload._id);
            state.items[index].quantity = state.items[index].quantity + 1;
        },
        removeOneQuantity: (state, action) => {
            const index = state.items.findIndex((item) => item._id === action.payload._id);
            state.items[index].quantity = state.items[index].quantity - 1;
        },
        emptyCart: (state, action) => {
            state.items = [];
        }
    },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, addOneQuantity, removeOneQuantity, emptyCart } = cartSlice.actions

export const selectCartItems = (state) => state.cart.items;

export const selectCartItemsWithId = (state, id) => state.cart.items.filter(item => item.id == id);

export const selectCartTotal = (state) => state.cart.items.reduce((total, item) => total += (item.price * item.quantity), 0)

export default cartSlice.reducer