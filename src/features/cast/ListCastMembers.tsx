import React, { useEffect, useState } from "react";
import { useDeleteCastMemberMutation, useGetCastMembersQuery } from "./castMembersSlice";
import { GridFilterModel, GridPaginationModel } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { enqueueSnackbar, useSnackbar } from "notistack";

export const ListCastMembers = () => {
    const initialOptions = {
        page: 1,
        search: "",
        perPage: 10,
        rowsPerPage: [10, 20, 30]
    }

    const [options, setOptions] = useState(initialOptions);
    const { enqueueSnackbar } = useSnackbar();

    const { data, isFetching, error } = useGetCastMembersQuery(options);

    const [ deleteCastMember, deleteCastMemberStatus ] = useDeleteCastMemberMutation();

    async function handleDeleteCastMember(id: string) {
        await deleteCastMember({ id });
    }

    function handleOnPageChange(pageModel: GridPaginationModel) {
        options.page = pageModel.page;
        options.perPage = pageModel.pageSize;
        setOptions(options);
    }

    function handleFilterChange(filterModel: GridFilterModel) {
        if (filterModel.quickFilterValues?.length) {
            const search = filterModel.quickFilterValues.join("");
            options.search = search;
            setOptions(options);
        } else {
            options.search = "";
        }
        setOptions(options);
    }

    useEffect(() => {
        if (deleteCastMemberStatus.isSuccess) {
            enqueueSnackbar("Cast member deleted successfully", { variant: "success" });
        }
        if(deleteCastMemberStatus.isError) {
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
        </Box>
    );
}