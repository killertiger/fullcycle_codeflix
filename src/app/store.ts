import { Action, PreloadedState, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import { uploadReducer } from '../features/UploadList/UploadSlice';
import { uploadQueue } from '../middleware/uploadQueue';
import { authSlice } from '../features/auth/authSlice';


const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  uploadSlice: uploadReducer,
  auth: authSlice.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false })
      .prepend(uploadQueue.middleware)
      .concat(apiSlice.middleware),
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
