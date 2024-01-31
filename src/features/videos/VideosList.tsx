import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { VideosTable } from "./components/VideosTable";
import { useEffect, useState } from "react";
import { GridFilterModel, GridPaginationModel } from "@mui/x-data-grid";
import { useDeleteVideoMutation, useGetVideosQuery } from "./VideoSlice";
import { enqueueSnackbar } from "notistack";

export const VideosList = () => {
    const [options, setOptions] = useState({
        page: 0,
        search: "",
        perPage: 10,
        rowsPerPage: [10, 20, 30]
    });
    const { data, isFetching, error } = useGetVideosQuery(options);
    const [deleteVideo, deleteVideoStatus] = useDeleteVideoMutation();

    async function handleDeleteVideo(id: string) {
        await deleteVideo({ id });
    }

    async function handleOnPageChange(pageModel: GridPaginationModel) {
        setOptions({
            ...options,
            page: pageModel.page,
            perPage: pageModel.pageSize
        });
    }

    function handleFilterChange(filterModel: GridFilterModel) {
        if (filterModel.quickFilterValues?.length) {
            const search = filterModel.quickFilterValues.join("");
            setOptions({
                ...options,
                search: search
            });
        }
        else {
            setOptions({
                ...options,
                search: ""
            });
        }
    }

    useEffect(() => {
        if(deleteVideoStatus.isSuccess) {
            enqueueSnackbar("Video deleted successfully", { variant: "success"});
        }
        if(deleteVideoStatus.error) {
            enqueueSnackbar("Video not deleted", { variant: "error"});
        }
    }, [deleteVideoStatus, enqueueSnackbar]);


    if (error) {
        return <Typography variant="h2">Error fetching videos!</Typography>
    }

    return (
        <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/videos/create"
                    style={{ marginBottom: "1rem" }}
                >
                    New Video
                </Button>
            </Box>

            <VideosTable
                data={data}
                perPage={options.perPage}
                isFetching={isFetching}
                rowsPerPage={options.rowsPerPage}
                page={options.page}
                handleDelete={handleDeleteVideo}
                handleOnPageChange={handleOnPageChange}
                handleFilterChange={handleFilterChange}
            />
        </Box>
    );
}