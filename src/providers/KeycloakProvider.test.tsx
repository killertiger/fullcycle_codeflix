import { configureStore } from "@reduxjs/toolkit";
import { keycloak } from "../keycloakConfig";
import { authSlice } from "../features/auth/authSlice";
import { Provider } from "react-redux";
import { KeycloakProvider } from "./KeycloakProvider";
import { render, waitFor } from "@testing-library/react";

jest.mock("../keycloakConfig");

const mockKeycloak = keycloak as jest.Mocked<typeof keycloak>;

describe("KeycloakProvider", () => {
    beforeEach(() => {
        mockKeycloak.init.mockReset();
        mockKeycloak.loadUserInfo.mockReset();
    });

    it("initialize keycloak and set user details on successful authentication", async () => {
        mockKeycloak.init.mockResolvedValue(true);
        mockKeycloak.loadUserInfo.mockResolvedValue({
            sub: "123",
            name: "John Doe",
            email: "john.doe@example.com",
        });

        const store = configureStore({
            reducer: { auth: authSlice.reducer },
        });

        render(
            <Provider store={store}>
                <KeycloakProvider>Test</KeycloakProvider>
            </Provider>
        );

        await new Promise((resolve) => setTimeout(resolve, 0));
        expect(mockKeycloak.init).toHaveBeenCalledTimes(1);
        expect(mockKeycloak.loadUserInfo).toHaveBeenCalledTimes(1);
        expect(store.getState().auth.isAuthenticated).toBe(true);
        expect(store.getState().auth.userDetails).toEqual({
            sub: "123",
            name: "John Doe",
            email: "john.doe@example.com",
        });
    });

    it("initialize keycloak and sets isAuthenticated to false on failed authentication", async () => {
        mockKeycloak.init.mockResolvedValue(false);

        const store = configureStore({
            reducer: { auth: authSlice.reducer },
        });

        render(
            <Provider store={store}>
                <KeycloakProvider>Test</KeycloakProvider>
            </Provider>
        );

        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(mockKeycloak.init).toHaveBeenCalledTimes(1);
        expect(mockKeycloak.loadUserInfo).toHaveBeenCalledTimes(0);
        expect(store.getState().auth.isAuthenticated).toBe(false);
        expect(store.getState().auth.userDetails).toBeNull();
    });

    it("initialize keycloak and sets isAuthenticated to false on error", async () => {
        const originalConsoleError = console.error;
        console.error = jest.fn();

        mockKeycloak.init.mockRejectedValue(new Error("Error"));

        const store = configureStore({
            reducer: { auth: authSlice.reducer },
        });

        render(
            <Provider store={store}>
                <KeycloakProvider>Test</KeycloakProvider>
            </Provider>
        );

        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(mockKeycloak.init).toHaveBeenCalledTimes(1);
        expect(mockKeycloak.loadUserInfo).toHaveBeenCalledTimes(0);
        expect(store.getState().auth.isAuthenticated).toBe(false);
        expect(store.getState().auth.userDetails).toBeNull();

        console.error = originalConsoleError;
    });


    it("updates token and dispatches setToken action when token expires", async () => {
        const mockUpdateToken = jest.fn().mockResolvedValue(true);
        mockKeycloak.updateToken = mockUpdateToken;

        const store = configureStore({
            reducer: { auth: authSlice.reducer },
        });

        render(
            <Provider store={store}>
                <KeycloakProvider>Test</KeycloakProvider>
            </Provider>
        );

        if (!mockKeycloak.onTokenExpired) {
            throw new Error("onTokenExpired is not defined");
        }
        
        mockKeycloak.onTokenExpired();

        await waitFor(() => expect(mockUpdateToken).toHaveBeenCalledTimes(1));

        expect(mockUpdateToken).toHaveBeenCalledWith(70);

        expect(store.getState().auth.token).toBe(mockKeycloak.token);
    });
});