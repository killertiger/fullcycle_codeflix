import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { VideosTable } from "./components/VideosTable";
import { useState } from "react";
import { GridFilterModel, GridPaginationModel } from "@mui/x-data-grid";
import { useGetVideosQuery } from "./VideoSlice";

export const VideosList = () => {
    const [options, setOptions] = useState({
        page: 0,
        search: "",
        perPage: 10,
        rowsPerPage: [10, 20, 30]
    });
    const { data, isFetching, error } = useGetVideosQuery(options);

    function handleDeleteVideo(id: string) {
        console.log("Delete video with id: ", id);
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
                    to="/video/create"
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