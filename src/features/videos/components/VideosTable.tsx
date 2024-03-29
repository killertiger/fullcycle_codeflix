import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef, GridFilterModel, GridPaginationModel, GridRenderCellParams, GridToolbar } from "@mui/x-data-grid";
import { Results } from "../../../types/Videos";
import { Box, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Genre } from "../../../types/Genre";
import { Category } from "../../../types/Categories";

type Props = {
    data: Results | undefined;
    perPage: number;
    page: number;
    isFetching: boolean;
    rowsPerPage?: number[];

    handleOnPageChange: (pageModel: GridPaginationModel) => void;
    handleFilterChange: (filterModel: GridFilterModel) => void;
    handleDelete: (id: string) => void;
};

export function VideosTable({
    data,
    perPage,
    page,
    isFetching,
    rowsPerPage,
    handleOnPageChange,
    handleFilterChange,
    handleDelete,
}: Props) {
    const slotProps = {
        toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
        },
    };

    function mapDataToGridRows(data: Results) {
        const { data: videos } = data;
        return videos.map((video) => ({
            id: video.id,
            title: video.title,
            genres: video.genres,
            categories: video.categories,
        }));
    }

    const columns: GridColDef[] = [
        { field: "title", headerName: "Title", flex: 1, renderCell: renderNameCell },
        { field: "genres", headerName: "Genres", flex: 1, renderCell: renderGenresCell },
        { field: "categories", headerName: "Categories", flex: 1, renderCell: renderCategoriesCell },
        { field: "id", headerName: "Actions", flex: 1, renderCell: renderActionsCell },

    ]

    function renderCategoriesCell(params: GridRenderCellParams) {
        const categories = params.value as Category[];
        const twoFirstCategories = categories.slice(0, 2);
        const remainingCategories = categories.length - twoFirstCategories.length;

        return (
            <Box style={{ overflowX: "scroll" }}>
                {/* {categories.map((category: any) => <Chip label={category.name} sx={{ mr: 1 }} />)} */}
                {twoFirstCategories.map((category, index) => (
                    <Chip key={index}
                        sx={{
                            fontSize: "0.6rem",
                            marginRight: 1,
                        }}
                        label={category.name}
                    />
                ))}

                {remainingCategories > 0 && (
                    <Tooltip title={(categories.slice(2).map((categories) => categories.name).join(", "))}>
                        <Chip
                            sx={{
                                fontSize: "0.6rem",
                                marginRight: 1,
                            }}
                            label={`+${remainingCategories}`}
                        />
                    </Tooltip>
                )}
            </Box>
        );
    }

    function renderGenresCell(params: GridRenderCellParams) {
        const genres = params.value as Genre[];
        const twoFirstGenres = genres.slice(0, 2);
        const remainingGenres = genres.length - twoFirstGenres.length;

        return (
            <Box style={{ overflowX: "scroll" }}>
                {twoFirstGenres.map((genre: Genre, index) => (
                    <Chip
                        key={index}
                        label={genre.name}
                        sx={{
                            fontSize: "0.6rem",
                            marginRight: 1,
                        }} />
                )
                )}

                {remainingGenres > 0 && (
                    <Tooltip title={(genres.slice(2).map((genre) => genre.name).join(", "))}>
                        <Chip
                            sx={{
                                fontSize: "0.6rem",
                                marginRight: 1,
                            }}
                            label={`+${remainingGenres}`}
                        />
                    </Tooltip>
                )}
            </Box>
        )
    }

    function renderActionsCell(params: GridRenderCellParams) {
        return (
            <IconButton
                color="secondary"
                onClick={() => handleDelete(params.value)}
                aria-label="delete"
                data-testid="delete-button">
                <DeleteIcon />
            </IconButton>
        )
    }

    function renderNameCell(rowData: GridRenderCellParams) {
        return (
            <Link
                style={{ textDecoration: "none " }}
                to={`/videos/edit/${rowData.id}`}>
                <Typography color="primary">{rowData.value}</Typography>
            </Link>
        )
    }

    const rows = data ? mapDataToGridRows(data) : [];
    const rowCount = data?.meta.total ?? 0;

    return (
        <Box sx={{ display: "flex", height: 600 }}>
            <DataGrid
                rows={rows}
                pagination={true}
                columns={columns}
                paginationModel={{
                    pageSize: perPage,
                    page: page,
                }}
                filterMode="server"
                rowCount={rowCount}
                loading={isFetching}
                paginationMode="server"
                checkboxSelection={false}
                disableColumnFilter={true}
                disableColumnSelector={true}
                disableDensitySelector={true}
                disableRowSelectionOnClick={true}
                pageSizeOptions={rowsPerPage}
                slots={{ toolbar: GridToolbar }}
                slotProps={slotProps}
                onPaginationModelChange={handleOnPageChange}
                onFilterModelChange={handleFilterChange}
            />
        </Box>
    )
}