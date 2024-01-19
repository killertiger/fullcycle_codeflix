import {Result, Results, Video, VideoParams } from "../../types/Videos";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/videos";

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

const getVideos = ({page=1, perPage=10, search=""}) => {
    const params: VideoParams = {page, perPage, search};
    return `${endpointUrl}?${parseQueryParams(params)}`;
}

const videosSlide = apiSlice.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        getVideos: query<Results, VideoParams>({
            query: getVideos,
            providesTags: ["Videos"],
        }),
    }),
});

export const { useGetVideosQuery } = videosSlide;