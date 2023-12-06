import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiSlice } from "../api/apiSlice";
import { CastMember, CastMemberParams, Results } from "../../types/CastMembers";

const endpointUrl = "/cast_members";

export const initialState: CastMember = {
    id: "",
    name: "",
    type: 0,
    deletedAt: null,
    createdAt: "",
    updatedAt: "string",
};

function parseQueryParams(params: CastMemberParams) {
    return null;
}

export const castMemberApiSlice = apiSlice.injectEndpoints({
    endpoints: () => null,
});