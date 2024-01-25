import { Box, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { initialState, useGetVideoQuery } from "./VideoSlice";
import { useEffect, useState } from "react";
import { Video } from "../../types/Videos";
import { enqueueSnackbar } from "notistack";

export function VideosEdit() {
    const id = useParams<{ id: string }>().id as string;

    const { data: video, isFetching } = useGetVideoQuery({ id });

    const [videoState, setVideoState] = useState<Video>(initialState);

    useEffect(() => {
        if (video) {
            setVideoState(video.data);
        }
    }, [video]);

    console.log(videoState);

    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h4">Edit Video</Typography>
                    </Box>
                </Box>


            </Paper>
        </Box>
    )
}