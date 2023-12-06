import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridFilterModel, GridPaginationModel, GridRenderCellParams, GridRowsProp, GridToolbar } from '@mui/x-data-grid';
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "./categorySlice";
import { CategoriesTable } from "./components/CategoryTable";

export const CategoryList = () => {
    const [page, setPage]  = useState(1);
    const [perPage] = useState(10);
    const [search, setSearch] = useState("");
    const [rowsPerPage] = useState([10, 25, 50]);

    const options = { perPage, search, page };
    
    const { data, isFetching, error } = useGetCategoriesQuery(options);
    const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();
    const { enqueueSnackbar } = useSnackbar();

    async function handleDeleteCategory(id: string) {
        await deleteCategory({ id });
        // 
    }

    function handleOnPageChange(pageModel: GridPaginationModel) {
        console.log("handleOnPageChange");
    }

    function handleFilterChange(filterModel: GridFilterModel) {
        console.log("handleFilterChange");
    }

    useEffect(() => {
        if (deleteCategoryStatus.isSuccess) {
            enqueueSnackbar("Category deleted successfully", { variant: "success" });
        }
        if (deleteCategoryStatus.error) {
            enqueueSnackbar("Category not deleted", { variant: "error" });
        }
    }, [deleteCategoryStatus, enqueueSnackbar]);

    return (
        <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/categories/create"
                    style={{ marginBottom: "1rem" }}
                >
                    New Category
                </Button>
            </Box>
            <CategoriesTable
                data={data}
                isFetching={isFetching}
                perPage={perPage}
                rowsPerPage={rowsPerPage}
                handleDelete={handleDeleteCategory}
                handleOnPageChange={handleOnPageChange}
                handleFilterChange={handleFilterChange}
            />
        </Box>
    )
};