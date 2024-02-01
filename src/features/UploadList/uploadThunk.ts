import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUploadProgress, UploadState } from "./UploadSlice";
import { uploadService } from "./uploadAPI";

export const updateVideo = createAsyncThunk(
    "uploads/uploadVideo",
    async ({ videoId, id, file, field }: UploadState, thunkAPI) => {
        const onUploadProgress = (progressEvent: ProgressEvent) => {
            // TODO - calculate the upload progress
            thunkAPI.dispatch(setUploadProgress({ id, progress: 0 }))
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