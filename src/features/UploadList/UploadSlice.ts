import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UploadState {
    id: string;
    videoId: string;
    field: string;
    file: File;
    progress?: number;
    status?: "idle" | "uploading" | "success" | "failed";
}

type UploadProgress = {
    id: string;
    progress: number;
}

const initialState: UploadState[] = [];

const uploadSlice = createSlice({
    name: "uploads",
    initialState,
    reducers: {
        addUpload(state, action: PayloadAction<UploadState>)  {
            state.push({
                ...action.payload,
                status: "idle",
                progress: 0,
            });
        },
        removeUpload(state, action: PayloadAction<string>) {
            const index = state.findIndex((upload) => upload.id === action.payload);
            if(index !== -1) {
                state.splice(index, 1);
            }
        },
        setUploadProgress(state, action: PayloadAction<UploadProgress>) {
            const {id, progress} = action.payload;
            const upload = state.find((upload) => upload.id === id);

            if(upload) {
                upload.progress = progress;
            }
        }
    },
});

export const { addUpload, removeUpload, setUploadProgress } = uploadSlice.actions;

//selector
export const selectUploads = (state: RootState) => state.uploadSlice;

export const uploadReducer = uploadSlice.reducer;