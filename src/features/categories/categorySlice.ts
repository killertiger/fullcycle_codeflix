import { CategoryParams, Result, Results } from "../../types/Categories";
import { apiSlice } from "../api/apiSlice";

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

function parseQueryParams(params: CategoryParams) {
    const query = new URLSearchParams();

    if (params.page) {
        query.append("page", (params.page + 1).toString());
    }

    if (params.perPage) {
        query.append("per_page", (params.perPage).toString());
    }

    if (params.search) {
        query.append("search", params.search);
    }

    if (params.isActive) {
        query.append("is_active", params.isActive.toString());
    }

    return query.toString();
}

function getCategories({ page = 0, perPage = 10, search = "" }) {
    const params = { page, perPage, search, isActive: true };

    return `${endpointUrl}?${parseQueryParams(params)}`
}

function getCategory({ id }: { id: string }) {
    return `${endpointUrl}/${id}`;
}

function deleteCategoryMutation(category: Category) {
    return {
        url: `${endpointUrl}/${category.id}`,
        method: "DELETE",
    };
};

function createCategoryMutation(category: Category) {
    return {
        url: endpointUrl,
        method: "POST",
        body: category,
    }
}

function updateCategoryMutation(category: Category) {
    return {
        url: `${endpointUrl}/${category.id}`,
        method: "PUT",
        body: category,
    }
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getCategories: query<Results, CategoryParams>({
            query: getCategories,
            providesTags: ["Categories"],
        }),
        getCategory: query<Result, { id: string }>({
            query: getCategory,
            providesTags: ["Categories"],
        }),
        createCategory: mutation<Result, Category>({
            query: createCategoryMutation,
            invalidatesTags: ["Categories"],
        }),
        deleteCategory: mutation<Result, { id: string }>({
            query: deleteCategoryMutation,
            invalidatesTags: ["Categories"],
        }),
        updateCategory: mutation<Result, Category>({
            query: updateCategoryMutation,
            invalidatesTags: ["Categories"],
        }),
    })
});

export const {
    useGetCategoriesQuery,
    useDeleteCategoryMutation,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useGetCategoryQuery
} = categoriesApiSlice;