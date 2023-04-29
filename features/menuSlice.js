import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    menus: [
        {
            _id: "23952566",
            name: "bibimbap",
            price: 11.99,
            category: "main",
            description: "This dish is Rice with veges on top with spicy sauce",
            removesOptions: [
                "No carrot",
                "No Seaweed"
            ]
        },
        {
            _id: "239525646",
            name: "haejangguk",
            price: 12.99,
            category: "main",
            description: "This soup is pork bone soup",
            removesOptions: [
                "No carrot",
                "No Seeds"
            ]
        },
        {
            _id: "2395256463",
            name: "Bulgogi Plate",
            price: 11.49,
            category: "main",
            description: "Plate of bulgogi with rice",
            removesOptions: [
                "No rice",
                "No salad"
            ]
        },
        {
            _id: "2395256464",
            name: "Don Katsu Plate",
            price: 11.49,
            category: "main",
            description: "Plate of bulgogi with rice",
            removesOptions: [
                "No rice",
                "No salad"
            ]
        },
        {
            _id: "239525644",
            name: "Chicken Plate",
            price: 11.49,
            category: "main",
            description: "Plate of bulgogi with rice",
            removesOptions: [
                "No rice",
                "No salad"
            ]
        },
        {
            _id: "2395256444",
            name: "Tempura Plate",
            price: 11.49,
            category: "main",
            description: "Plate of bulgogi with rice",
            removesOptions: [
                "No rice",
                "No salad"
            ]
        },
        {
            _id: "239524",
            name: "Jeyuk Plate",
            price: 11.49,
            category: "main",
            description: "Plate of bulgogi with rice",
            removesOptions: [
                "No rice",
                "No salad"
            ]
        },
        {
            _id: "239524",
            name: "dumplings",
            price: 11.49,
            category: "appetizer",
            description: "Plate of bulgogi with rice",
            removesOptions: [
                "No rice",
                "No salad"
            ]
        },
    ],
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {

    },
})

// Action creators are generated for each case reducer function

export const selectMenuMenus = (state) => state.menu.menus;

export const selectMenuMenusByCategory = (state, category) => state.menu.menus.filter(menu => menu.category == category);

export default menuSlice.reducer