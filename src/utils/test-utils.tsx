import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import type { RootState } from '../app/store'
import { castMemberApiSlice } from '../features/cast/castMembersSlice'
import { apiSlice } from '../features/api/apiSlice'
import { SnackbarProvider } from 'notistack'
import { BrowserRouter } from 'react-router-dom'
// As a basic setup, import your same slice reducers
// import userReducer from '../features/users/userSlice'


// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>;
    store?: ReturnType<typeof configureStore>;
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        // Automatically create a store instance if no store was passed in
        store = configureStore({
            reducer: { [castMemberApiSlice.reducerPath]: apiSlice.reducer, },
        }),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <SnackbarProvider>{children}</SnackbarProvider>
                </BrowserRouter>
            </Provider>
        );
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}