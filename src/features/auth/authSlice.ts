import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    token: "",
    userDetails: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setLoginLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
        },
    },
});

export const {
    setAuthenticated,
    setLoginLoading,
    setToken,
    setUserDetails,
} = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export const selectIsLoading = (state: RootState) => state.auth.isLoading;