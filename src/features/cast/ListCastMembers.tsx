import React, { useEffect, useState } from "react";
import { useGetCastMembersQuery } from "./castMembersSlice";
import { GridFilterModel, GridPaginationModel } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

export const ListCastMembers = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(10);
    const [rowsPerPage] = useState([10, 25, 50, 100]);
    const options = { page, perPage, search };

    const { data, isFetching, error } = useGetCastMembersQuery(options);

    function handleOnPageChange(pageModel: GridPaginationModel) {
        setPage(pageModel.page + 1);
        setPerPage(pageModel.pageSize);
    }

    function handleFilterChange(filterModel: GridFilterModel) {
        if (filterModel.quickFilterValues?.length) {
            const search = filterModel.quickFilterValues.join("");
            setSearch(search);
        } else {
            setSearch("");
        }   
    }

    useEffect(() => {
        if (error) {
            console.log(error);
        }
    }, [error]);

    if (error) {
        return <Typography variant="h2">Error!</Typography>;
    }

    return <div>ListCastMembers</div>;
}