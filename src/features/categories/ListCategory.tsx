import { Box, Button, IconButton, Link, Typography } from "@mui/material"
import { useAppSelector } from "../../app/hooks";
import { selectCategories } from "./categorySlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridRowsProp, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';

export const CategoryList = () => {
    const categories = useAppSelector(selectCategories)

    const slotProps = {
        toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
        },
    }

    const rows: GridRowsProp = categories.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        isActive: category.is_active,
        createdAt: new Date(category.created_at).toLocaleDateString("pt-BR"),
    }));

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

    function renderActionsCell(rowData: GridRenderCellParams) {
        return (
            <IconButton
                color="secondary"
                onClick={() => console.log("clicked")}
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
                href={`/categories/edit/${rowData.id}`}>
                <Typography color="primary">{rowData.value}</Typography>
            </Link>
        )
    }

    return (
        <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    href="/categories/create"
                    style={{ marginBottom: "1rem" }}
                >
                    New Category
                </Button>
            </Box>

            <Box sx={{ display: "flex", height: 600}}>
                <DataGrid
                    columns={columns} 
                    disableColumnFilter={true}
                    disableColumnSelector={true}
                    disableDensitySelector={true}
                    disableRowSelectionOnClick={true}
                    pageSizeOptions={[2, 20, 50, 100]}
                    rows={rows}
                    slotProps={slotProps}
                    slots={{ toolbar: GridToolbar }}
                    />
            </Box>
        </Box>
    )
};