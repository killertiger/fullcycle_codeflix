import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { VideosForm } from './components/VideosForm';
import { initialState } from './VideoSlice';

export const VideosCreate = () => {
    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h4">Create Video</Typography>
                    </Box>
                </Box>

                <VideosForm
                    video={initialState}
                    genres={[]}
                    categories={[]}
                    cast_members={[]}
                    isDisabled={false}
                    isLoading={false}
                    handleChange={() => { }}
                    handleSubmit={() => { }}
                />
            </Paper>
        </Box>
    );
}