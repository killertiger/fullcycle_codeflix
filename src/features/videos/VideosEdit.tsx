import { Box, Paper, Typography, fabClasses } from "@mui/material";
import { useParams } from "react-router-dom";
import { initialState, useGetAllCastMembersQuery, useGetAllCategoriesQuery, useGetAllGenresQuery, useGetVideoQuery, useUpdateVideoMutation } from "./VideoSlice";
import { HtmlHTMLAttributes, useEffect, useState } from "react";
import { Video, VideoPayload } from "../../types/Videos";
import { enqueueSnackbar } from "notistack";
import { VideosForm } from "./components/VideosForm";
import { mapVideoToForm } from "./util";

export function VideosEdit() {
    const id = useParams<{ id: string }>().id as string;

    const { data: video, isFetching } = useGetVideoQuery({ id });

    const [videoState, setVideoState] = useState<Video>(initialState);
    const [updateVideo, status] = useUpdateVideoMutation();

    const { data: categories } = useGetAllCategoriesQuery();
    const { data: genres } = useGetAllGenresQuery();
    const { data: cast_members } = useGetAllCastMembersQuery();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        const { name, value } = event.target;
        setVideoState((state) => ({ ...state, [name]: value }));
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const payload = mapVideoToForm(videoState);
        updateVideo(payload);
    }

    useEffect(() => {
        if (video) {
            setVideoState(video.data);
        }
    }, [video]);

    console.log(videoState);

    useEffect(() => {
        if(status.isSuccess) {
            enqueueSnackbar('Video updated successfully', { variant: 'success' });
        }
        else if(status.isError) {
            enqueueSnackbar('Video update failed', { variant: 'error' });
        }
    }, [status, enqueueSnackbar]);

    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h4">Edit Video</Typography>
                    </Box>
                </Box>

                <VideosForm 
                    video={videoState}
                    genres={genres?.data}
                    categories={categories?.data}
                    cast_members={cast_members?.data}
                    isDisabled={isFetching}
                    isLoading={isFetching}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />

            </Paper>
        </Box>
    )
}