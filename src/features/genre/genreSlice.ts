import { Results } from "../../types/Categories";
import { Genre, GenreParams, GenrePayload, Result } from "../../types/Genre";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/genres";

export const initialState: Genre = {
    id: "",
    name: "",
    created_at: "",
    updated_at: "",
    deleted_at: null,
    is_active: false,
    categories: [],
    description: "",
    pivot: { genre_id: "", category_id: "" },
}

function parseQueryParams(params: GenreParams) {
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

function createGenreMutation(genre: GenrePayload) {
    return {
        url: endpointUrl,
        method: "POST",
        body: genre,
    };
}

function getAllCategories() {
    return "categories?all=true";
}

function getGenre({ id }: { id: string }) {
    return `${endpointUrl}/${id}`;
}

function updateGenreMutation(genre: GenrePayload) {
    return {
        url: `${endpointUrl}/${genre.id}`,
        method: "PUT",
        body: genre
    }
}

export const genresSlice = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getAllCategories: query<Results, void>({
            query: getAllCategories,
        }),
        getGenre: query<Result, { id: string }>({
            query: getGenre,
            providesTags: ["Genres"]
        }),
        updateGenre: mutation<Genre, GenrePayload>({
            query: updateGenreMutation,
            invalidatesTags: ["Genres"],
        }),
        createGenre: mutation<GenrePayload, GenrePayload>({
            query: createGenreMutation,
            invalidatesTags: ["CastMembers"],
        }),
    }),
});

export const {
    useCreateGenreMutation,
    useGetAllCategoriesQuery,
    useGetGenreQuery,
    useUpdateGenreMutation
} = genresSlice;