import { Action, PreloadedState, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import { uploadReducer } from '../features/UploadList/UploadSlice';


const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  uploadSlice: uploadReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
