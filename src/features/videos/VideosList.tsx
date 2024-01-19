import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { VideosTable } from "./components/VideosTable";

export const VideosList = () => {
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

            {/* <VideosTable
                data={data}
                perPage={options.perPage}
                isFetching={isFetching}
                rowsPerPage={options.rowsPerPage}
                page={options.page}
                handleDelete={handleDeleteGenre}
                handleOnPageChange={handleOnPageChange}
                handleFilterChange={handleFilterChange}
            /> */}
        </Box>
    );
}