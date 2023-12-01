import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiSlice } from "../api/apiSlice";
import { Result, Results } from "../../types/Categories";

export interface Category {
    id: string;
    name: string;
    description: null | string;
    is_active: boolean;
    deleted_at: null | string;
    created_at: string;
    updated_at: string;
};

const endpointUrl = "/categories";

function deleteCategoryMutation (category: Category) {
    return {
        url: `${endpointUrl}/${category.id}`,
        method: "DELETE",
    };
};

export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getCategories: query<Results, void>({
            query: () => endpointUrl,
            providesTags: ["Categories"],
        }),
        deleteCategory: mutation<Result, { id: string }>({
            query: deleteCategoryMutation,
            invalidatesTags: ["Categories"],
        }),
    })
});

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
    { ...category, id: "y", name: "Red", is_active: false },
    { ...category, id: "z", name: "Blue" },
    { ...category, id: "w", name: "Green" },
];

const categoriesSlice = createSlice({
    name: "categories",
    initialState: initialState,
    reducers: {
        createCategory(state, action) { 
            state.push(action.payload);
        },
        updateCategory(state, action) {
            // find index on state of category to update
            const index = state.findIndex(
                (category) => category.id === action.payload.id
            );
            // update category on state
            state[index] = action.payload;
        },
        deleteCategory(state, action) { 
            const index = state.findIndex(
                (category) => category.id === action.payload.id
            );
            state.splice(index, 1);
        },
    },
});

// Selectors
export const selectCategories = (state: RootState) => state.categories;
export const selectCategoryById = (state: RootState, id: string) => {
    const category = state.categories.find((category) => category.id === id);

    return category || {
        id: "",
        name: "",
        description: "",
        is_active: false,
        deleted_at: null,
        created_at: "",
        updated_at: "",
    };
}

export default categoriesSlice.reducer;
export const { createCategory, updateCategory, deleteCategory } = categoriesSlice.actions;
export const { useGetCategoriesQuery, useDeleteCategoryMutation } = categoriesApiSlice;