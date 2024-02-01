import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { VideosForm } from './components/VideosForm';
import { initialState, useGetAllGenresQuery, useGetAllCastMembersQuery, useCreateVideoMutation } from './VideoSlice';
import { useSnackbar } from 'notistack';
import { Video } from '../../types/Videos';
import { mapVideoToForm } from './util';
import { Category } from '../../types/Categories';
import { useUniqueCategories } from '../../hooks/useUniqueCategories';

export const VideosCreate = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { data: genres } = useGetAllGenresQuery();
    const { data: cast_members } = useGetAllCastMembersQuery();

    const [createVideo, status] = useCreateVideoMutation();
    const [videoState, setVideoState] = useState<Video>(initialState);

    const [categories] = useUniqueCategories(videoState, setVideoState);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    console.log("selectedFiles", selectedFiles);

    function handleAddFile(files: FileList | null) {
        if (!files) {
          return;
        }
        const filesArr = Array.from(files);
        setSelectedFiles([...selectedFiles, ...filesArr]);
    }

    function handleRemoveFile(file: File) {
        setSelectedFiles(selectedFiles.filter((f) => f !== file));
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setVideoState((state) => ({ ...state, [name]: value }));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await createVideo(mapVideoToForm(videoState))
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