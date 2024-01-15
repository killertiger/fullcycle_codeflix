import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef, GridFilterModel, GridPaginationModel, GridRenderCellParams, GridToolbar } from "@mui/x-data-grid";
import { Results } from "../../../types/Genre";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";

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

export function GenreTable({
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
        const { data: genres } = data;
        return genres.map((genre) => ({
            id: genre.id,
            name: genre.name,
            categories: genre.categories,
        }));
    }

    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", flex: 1, renderCell: renderNameCell },
        { field: "id", headerName: "Actions", flex: 1, renderCell: renderActionsCell},

    ]

    function renderActionsCell(params: GridRenderCellParams) {
        return (
            <IconButton
                color="secondary"
                onClick={() => handleDelete(params.value)}
                aria-label="delete"
                data-testid="delete-button">
                    <DeleteIcon/>
            </IconButton>
        )
    }

    function renderNameCell(rowData: GridRenderCellParams) {
        return (
            <Link
                style={{ textDecoration: "none " }}
                to={`/genres/edit/${rowData.id}`}>
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