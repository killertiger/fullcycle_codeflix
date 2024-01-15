import { Box, Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { GenreTable } from "./components/GenreTable"
import { useEffect, useState } from "react"
import { useSnackbar } from "notistack"
import { useDeleteGenreMutation, useGetGenresQuery } from "./genreSlice"
import { GridFilterModel, GridPaginationModel } from "@mui/x-data-grid"

export const GenreList = () => {
    const [options, setOptions] = useState({
        page: 0,
        search: "",
        perPage: 10,
        rowsPerPage: [10, 20, 30]
    });
    const { enqueueSnackbar } = useSnackbar();
    const { data, isFetching, error } = useGetGenresQuery(options);
    const [deleteGenre, deleteGenreStatus] = useDeleteGenreMutation();

    async function handleDeleteGenre(id: string) {
        await deleteGenre({ id });
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
        if(deleteGenreStatus.isSuccess) {
            enqueueSnackbar("Genre deleted successfully", { variant: "success" });
        }
        else if (deleteGenreStatus.isError) {
            enqueueSnackbar("Genre not deleted", { variant: "error" });
        }
    }, [deleteGenreStatus, enqueueSnackbar]);

    if(error) {
        return <Typography variant="h2">Error fetching genres!</Typography>
    }

    return (
        <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/genres/create"
                    style={{ marginBottom: "1rem" }}
                >
                    New Genre
                </Button>
            </Box>

            <GenreTable
                data={data}
                perPage={options.perPage}
                isFetching={isFetching}
                rowsPerPage={options.rowsPerPage}
                page={options.page}
                handleDelete={handleDeleteGenre}
                handleOnPageChange={handleOnPageChange}
                handleFilterChange={handleFilterChange}
            />
        </Box>
    )
}