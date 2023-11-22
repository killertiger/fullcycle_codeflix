import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Category {
    id: string;
    name: string;
    description: null | string;
    is_active: boolean;
    deleted_at: null | string;
    created_at: string;
    updated_at: string;
};

const category: Category = {
    id: "x",
    name: "Olive",
    description: "Any description",
    is_active: true,
    deleted_at: null,
    created_at: "2023-09-13T09:35:46.000000Z",
    updated_at: "2023-09-13T09:35:46.000000Z",
};

export const initialState = [
    category,
    {... category, id: "y", name: "Red", is_active: false},
    {... category, id: "z", name: "Blue"},
    {... category, id: "w", name: "Green"},
];

const categoriesSlice = createSlice({
    name: "categories",
    initialState: initialState,
    reducers: {
        createCategory(state, action) {},
        updateCategory(state, action) {},
        deleteCategory(state, action) {},
    },
});

// Selectors
export const selectCategories = (state: RootState) => state.categories;

export default categoriesSlice.reducer;