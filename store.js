import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import menuReducer from './features/menuSlice';


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        menu: menuReducer,
    },
});