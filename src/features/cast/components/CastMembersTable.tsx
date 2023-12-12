import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef, GridFilterModel, GridPaginationModel, GridRenderCellParams, GridToolbar } from "@mui/x-data-grid";
import { Results } from "../../../types/CastMembers";
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
}

export function CastMembersTable({
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

    const columns: GridColDef[] = [
        {
            flex: 1,
            field: "name",
            headerName: "Name",
            renderCell: renderNameCell,
        },
        {
            flex: 1,
            field: "type",
            headerName: "Type",
            renderCell: renderTypeCell,
        },
        {
            flex: 1,
            field: "id",
            headerName: "Actions",
            renderCell: renderActionsCell
        }
    ];

    function renderNameCell(rowData: GridRenderCellParams) {
        return (
            <Link style={{textDecoration: "none"}} 
            to={`/cast-members/edit/${rowData.id}`}>
                <Typography color="primary">{rowData.value}</Typography>
            </Link>
        )
    }

    function renderActionsCell(rowData: GridRenderCellParams) {
        return (
            <IconButton
                color="secondary"
                onClick={(params) => handleDelete(rowData.value)}
                aria-label="delete">
                <DeleteIcon />
            </IconButton>
        )
    }

    function renderTypeCell(rowData: GridRenderCellParams) {
        return (
            <Typography color="primary">
                {rowData.value === 1 ? "Director" : "Actor"}
            </Typography>
        )
    }

    function mapDataToGridRows(data: Results) {
        const { data: castMembers } = data;
        return castMembers.map((castMember) => ({
            id: castMember.id,
            name: castMember.name,
            type: castMember.type
        }));
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