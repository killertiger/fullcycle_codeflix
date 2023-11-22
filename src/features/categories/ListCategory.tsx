import { Box, Button, Link, Typography } from "@mui/material"
import { useAppSelector } from "../../app/hooks";
import { selectCategories } from "./categorySlice";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

export const CategoryList = () => {
    const categories = useAppSelector(selectCategories)

    const rows: GridRowsProp = categories.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
    }));

      const columns: GridColDef[] = [
        { field: 'id', headerName: 'Id', width: 150 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'description', headerName: 'Description', width: 150 },
      ];

    return (
        <Box maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Box display="flex" justifyContent="flex-end">
                <Button
                variant="contained"
                color="secondary"
                component={Link}
                href="/categories/create"
                style={{marginBottom: "1rem"}}
                >
                    New Category
                </Button>
            </Box>
            
            <div style={{height: 300, width: '100%'}}>
                <DataGrid rows={rows} columns={columns} />
            </div>
        </Box>
    )
};