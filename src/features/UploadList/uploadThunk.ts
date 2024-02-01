import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUploadProgress, UploadState } from "./UploadSlice";
import { uploadProgress, uploadService } from "./uploadAPI";
import { AxiosProgressEvent } from "axios";

export const updateVideo = createAsyncThunk(
    "uploads/uploadVideo",
    async ({ videoId, id, file, field }: UploadState, thunkAPI) => {
        const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
            const progress = uploadProgress(progressEvent);
            thunkAPI.dispatch(setUploadProgress({ id, progress: progress }))
        };

        try {
            const params = { videoId, id, file, field, onUploadProgress };
            const response = await uploadService(params);
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
)