import { Box, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useUniqueCategories } from '../../hooks/useUniqueCategories';
import { FileObject, Video } from '../../types/Videos';
import { initialState, useCreateVideoMutation, useGetAllCastMembersQuery, useGetAllGenresQuery } from './VideoSlice';
import { VideosForm } from './components/VideosForm';
import { mapVideoToForm } from './util';
import { useAppDispatch } from '../../app/hooks';
import { addUpload, removeUpload, setUploadProgress } from '../UploadList/UploadSlice';
import { nanoid } from '@reduxjs/toolkit';


export const VideosCreate = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { data: genres } = useGetAllGenresQuery();
    const { data: cast_members } = useGetAllCastMembersQuery();

    const [createVideo, status] = useCreateVideoMutation();
    const [videoState, setVideoState] = useState<Video>(initialState);

    const [categories] = useUniqueCategories(videoState, setVideoState);
    const [selectedFiles, setSelectedFiles] = useState<FileObject[]>([]);

    const dispatch = useAppDispatch();

    console.log("selectedFiles", selectedFiles);

    function handleAddFile({name, file}: FileObject) {
        setSelectedFiles([...selectedFiles, {name, file}]);
    }

    function handleRemoveFile(name: string) {
        setSelectedFiles(selectedFiles.filter((file) => file.name !== name));
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setVideoState((state) => ({ ...state, [name]: value }));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await createVideo(mapVideoToForm(videoState));

        // const mockID = nanoid();
        // let progress = 0;
        // // mock add video
        // dispatch(
        //     addUpload({
        //         id: mockID,
        //         file: new File([], "test"),
        //         videoId: "1",
        //         field: "test",
        //     })
        // );

        // setTimeout(() => {
        //     dispatch(
        //         setUploadProgress({
        //             id: mockID,
        //             progress: progress + 50,
        //         })
        //     );
        // }, 2000);


        // setTimeout(() => {
        //     dispatch(removeUpload(mockID));
        // }, 3000);

    }


    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar('Video created successfully', { variant: 'success' });
        }

        if (status.isError) {
            enqueueSnackbar('Video creation failed', { variant: 'error' });
        }

    }, [status, enqueueSnackbar]);

    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h4">Create Video</Typography>
                    </Box>
                </Box>

                <VideosForm
                    video={videoState}
                    genres={genres?.data}
                    categories={categories}
                    cast_members={cast_members?.data}
                    isDisabled={status.isLoading}
                    isLoading={status.isLoading}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleAddFile={handleAddFile}
                    handleRemoveFile={handleRemoveFile}
                />
            </Paper>
        </Box>
    );
}