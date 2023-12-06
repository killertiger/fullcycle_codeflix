import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef, GridFilterModel, GridPaginationModel, GridRenderCellParams, GridToolbar } from "@mui/x-data-grid";
import { Results } from "../../../types/Categories";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { NestCamWiredStandTwoTone } from "@mui/icons-material";

type Props = {
    data: Results | undefined;
    perPage: number;
    page: number;
    isFetching: boolean;
    rowsPerPage?: number[];

    handleOnPageChange: (pageModel: GridPaginationModel) => void;
    handleFilterChange: (filterModel: GridFilterModel) => void;
    // handleOnPageSizeChange: (pageSize: number) => void;
    handleDelete: (id: string) => void;
};

export function CategoriesTable({
    data,
    perPage,
    page,
    isFetching,
    rowsPerPage,
    handleOnPageChange,
    handleFilterChange,
    // handleOnPageSizeChange,
    handleDelete,
}: Props) {

    const slotProps = {
        toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
        },
    };

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            renderCell: renderNameCell,
        },
        {
            field: 'isActive',
            headerName: 'Active',
            flex: 1,
            type: 'boolean',
            renderCell: renderIsActiveCell,
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            flex: 1
        },
        {
            field: 'id',
            headerName: 'Actions',
            flex: 1,
            renderCell: renderActionsCell,
        }
    ];

    function mapDataToGridRows(data: Results) {
        const { data: categories } = data;
        return categories.map((category) => ({
            id: category.id,
            name: category.name,
            isActive: category.is_active,
            created_at: new Date(category.created_at).toLocaleDateString("pt-BR"),
        }))
    }

    function renderActionsCell(rowData: GridRenderCellParams) {
        return (
            <IconButton
                color="secondary"
                onClick={(params) => handleDelete(rowData.value)}
                aria-label="delete"
            >
                <DeleteIcon />
            </IconButton>
        )
    }

    function renderIsActiveCell(rowData: GridRenderCellParams) {
        return (
            <Typography color={rowData.value ? "primary" : "secondary"}>
                {rowData.value ? "Active" : "Inactive"}
            </Typography>
        )
    }

    function renderNameCell(rowData: GridRenderCellParams) {
        return (
            <Link style={{ textDecoration: "none" }}
                to={`/categories/edit/${rowData.id}`}>
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
            // onPageSizeChange={handleOnPageSizeChange} - not found, probably will be addressed on onPaginationModelChange
            // onPageChange - not found, probably will be addressed on onPaginationModelChange
            />
        </Box>
    )
}