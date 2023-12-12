import React, { useEffect, useState } from "react";
import { useDeleteCastMemberMutation, useGetCastMembersQuery } from "./castMembersSlice";
import { GridFilterModel, GridPaginationModel } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { CastMembersTable } from "./components/CastMembersTable";

export const ListCastMembers = () => {
    const [options, setOptions] = useState({
        page: 0,
        search: "",
        perPage: 10,
        rowsPerPage: [10, 20, 30]
    });
    const { enqueueSnackbar } = useSnackbar();
    const { data, isFetching, error } = useGetCastMembersQuery(options);
    const [deleteCastMember, deleteCastMemberStatus] = useDeleteCastMemberMutation();

    async function handleDeleteCastMember(id: string) {
        await deleteCastMember({ id });
    }

    function handleOnPageChange(pageModel: GridPaginationModel) {
        console.log(pageModel.page);
        setOptions({
            ...options,
            page: pageModel.page,
            perPage: pageModel.pageSize
        });
    }

    function handleFilterChange(filterModel: GridFilterModel) {
        if (filterModel.quickFilterValues?.length) {
            const search = filterModel.quickFilterValues.join("");
            setOptions({
                ...options,
                search: search
            });
        }
        else {
            setOptions({
                ...options,
                search: ""
            });
        }
    }

    useEffect(() => {
        if (deleteCastMemberStatus.isSuccess) {
            enqueueSnackbar("Cast member deleted successfully", { variant: "success" });
        }
        if (deleteCastMemberStatus.isError) {
            enqueueSnackbar("Cast member not deleted", { variant: "error" });
        }
    }, [deleteCastMemberStatus, enqueueSnackbar]);

    if (error) {
        return <Typography variant="h2">Error!</Typography>;
    }

    return (
        <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box display="flex" justifyContent="flex-end">
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/cast-members/create"
                    style={{ marginBottom: "1rem" }}
                >
                    New Cast Member
                </Button>
            </Box>
            <CastMembersTable
                data={data}
                perPage={options.perPage}
                isFetching={isFetching}
                rowsPerPage={options.rowsPerPage}
                page={options.page}
                handleDelete={handleDeleteCastMember}
                handleOnPageChange={handleOnPageChange}
                handleFilterChange={handleFilterChange}
            />
        </Box>
    );
}