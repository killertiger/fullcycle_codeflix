import { createListenerMiddleware } from "@reduxjs/toolkit";
import { addUpload } from "../features/UploadList/UploadSlice";
import { updateVideo } from "../features/UploadList/uploadThunk";

export const uploadQueue = createListenerMiddleware();

uploadQueue.startListening({
    actionCreator: addUpload,
    effect: async (action, store) => {
        await store.dispatch(updateVideo(action.payload));
    }
});