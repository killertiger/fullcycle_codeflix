import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { VideosForm } from './components/VideosForm';
import { initialState, useGetAllGenresQuery, useGetAllCastMembersQuery, useCreateVideoMutation } from './VideoSlice';
import { useSnackbar } from 'notistack';
import { Video } from '../../types/Videos';
import { mapVideoToForm } from './util';
import { Category } from '../../types/Categories';

export const VideosCreate = () => {
    const { enqueueSnackbar } = useSnackbar();

    const { data: genres } = useGetAllGenresQuery();
    const { data: cast_members } = useGetAllCastMembersQuery();

    const [createVideo, status] = useCreateVideoMutation();
    const [videoState, setVideoState] = useState<Video>(initialState);

    const [uniqueCategoriesState, setUniqueCategoriesStates] = useState<(Category | undefined)[]>();
    const categoriesToKeepRef = useRef<Category[] | undefined>(undefined);


    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setVideoState((state) => ({ ...state, [name]: value }));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await createVideo(mapVideoToForm(videoState))
    }

    const filterById = (
        category: Category | undefined,
        index: number,
        self: (Category | undefined)[]
    ): boolean => index === self.findIndex((c) => c?.id === category?.id);

    useEffect(() => {
        const uniqueCategories = videoState.genres?.flatMap(({ categories }) => categories).filter(filterById) as Category[];

        setUniqueCategoriesStates(uniqueCategories);
    }, [videoState.genres])

    useEffect(() => {
        categoriesToKeepRef.current = videoState.categories?.filter(
            (category) => uniqueCategoriesState?.find((c) => c?.id === category.id)
        );
    }, [uniqueCategoriesState, videoState.categories]);

    useEffect(() => {
        setVideoState((state: Video) => ({
            ...state,
            categories: categoriesToKeepRef.current
        }));
    }, [uniqueCategoriesState, setVideoState])

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
                    categories={uniqueCategoriesState as Category[]}
                    cast_members={cast_members?.data}
                    isDisabled={status.isLoading}
                    isLoading={status.isLoading}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </Paper>
        </Box>
    );
}