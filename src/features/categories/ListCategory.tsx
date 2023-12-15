import { Box, Button, Typography } from "@mui/material";
import { GridFilterModel, GridPaginationModel } from '@mui/x-data-grid';
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "./categorySlice";
import { CategoryTable } from "./components/CategoryTable";

export const CategoryList = () => {
    const [page, setPage]  = useState(0);
    const [perPage, setPerPage] = useState(10);
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
        console.log("handleOnPageChange " + pageModel.page);
        setPage(pageModel.page);
        setPerPage(pageModel.pageSize);
    }

    function handleFilterChange(filterModel: GridFilterModel) {
        console.log("handleFilterChange");
        if(filterModel.quickFilterValues?.length) {
            const search = filterModel.quickFilterValues.join("");
            setSearch(search);
        } else {
            setSearch("");
        }
    }

    useEffect(() => {
        if (deleteCategoryStatus.isSuccess) {
            enqueueSnackbar("Category deleted successfully", { variant: "success" });
        }
        if (deleteCategoryStatus.error) {
            enqueueSnackbar("Category not deleted", { variant: "error" });
        }
    }, [deleteCategoryStatus, enqueueSnackbar]);

    if (error) {
        return <Typography>Error fetching categories</Typography>
    }

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
            <CategoryTable
                data={data}
                isFetching={isFetching}
                perPage={perPage}
                rowsPerPage={rowsPerPage}
                page={page}
                handleDelete={handleDeleteCategory}
                handleOnPageChange={handleOnPageChange}
                handleFilterChange={handleFilterChange}
            />
        </Box>
    )
};