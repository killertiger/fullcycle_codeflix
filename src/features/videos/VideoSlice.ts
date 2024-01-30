import { Result, Results, Video, VideoParams, VideoPayload } from "../../types/Videos";
import { Results as CategoriesResults} from "../../types/Categories";
import { Results as GenresResults} from "../../types/Genre";
import { Results as CastMembersResults} from "../../types/CastMembers";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/videos";

export const initialState: Video = {
    id: "",
    title: "",
    description: "",
    year_launched: 0,
    opened: false,
    rating: "",
    duration: 0,
    deleted_at: null,
    created_at: "",
    updated_at: "",
    genres: [],
    categories: [],
    cast_members: [],
    thumb_file_url: "",
    banner_file_url: "",
    trailer_file_url: "",
    video_file_url: "",
};

function parseQueryParams(params: VideoParams) {
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

const getVideos = ({ page = 1, perPage = 10, search = "" }) => {
    const params: VideoParams = { page, perPage, search };
    return `${endpointUrl}?${parseQueryParams(params)}`;
}

function getVideo({ id }: { id: string }) {
    return `${endpointUrl}/${id}`;
}

function deleteVideo({ id }: { id: string }) {
    return { url: `${endpointUrl}/${id}`, method: "DELETE" };
}

function updateVideo(video: VideoPayload) {
    return {
        url: `${endpointUrl}/${video.id}`,
        method: "PUT",
        body: video,
    }
}

function getAllCategories() {
    return `categories?all=true`;
}

function getAllGenres() {
    return `genres?all=true`;
}

function getAllCastMembers() {
    return `cast_members?all=true`;
}

function createVideo(video: VideoPayload) {
    return {
        url: `${endpointUrl}`,
        method: "POST",
        body: video,
    }
}

export const videosSlide = apiSlice.injectEndpoints({
    endpoints: ({ query, mutation }) => ({
        getVideos: query<Results, VideoParams>({
            query: getVideos,
            providesTags: ["Videos"],
        }),
        updateVideo: mutation<Result, VideoPayload>({
            query: updateVideo,
            invalidatesTags: ["Videos"],
        }),
        getVideo: query<Result, { id: string }>({
            query: getVideo,
            providesTags: ["Videos"]
        }),
        deleteVideo: mutation<Result, { id: string }>({
            query: deleteVideo,
            invalidatesTags: ["Videos"],
        }),
        createVideo: mutation<Result, VideoPayload>({
            query: createVideo,
            invalidatesTags: ["Videos"],
        }),
        getAllCategories: query<CategoriesResults, void>({
            query: getAllCategories,
            providesTags: ["Categories"],
        }),
        getAllGenres: query<GenresResults, void>({
            query: getAllGenres,
            providesTags: ["Genres"],
        }),
        getAllCastMembers: query<CastMembersResults, void>({
            query: getAllCastMembers,
            providesTags: ["CastMembers"],
        }),
    }),
});

export const {
    useGetVideosQuery,
    useGetVideoQuery,
    useDeleteVideoMutation,
    useUpdateVideoMutation,
    useGetAllCategoriesQuery,
    useGetAllGenresQuery,
    useGetAllCastMembersQuery,
    useCreateVideoMutation,
} = videosSlide;