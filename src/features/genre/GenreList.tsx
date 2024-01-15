import { Box, Button } from "@mui/material"
import { Link } from "react-router-dom"
import { GenreTable } from "./components/GenreTable"
import { useState } from "react"
import { useSnackbar } from "notistack"
import { useDeleteGenreMutation, useGetGenresQuery } from "./genreSlice"

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
                isFetching={isFetching}
                perPage={perPage}
                rowsPerPage={rowsPerPage}
                page={page}
                handleDelete={handleDeleteGenre}
                handleOnPageChange={handleOnPageChange}
                handleFilterChange={handleFilterChange}
            />
        </Box>
    )
}