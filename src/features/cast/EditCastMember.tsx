import { Box, Paper, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
import { initialState, useGetCastMemberQuery, useUpdateCastMemberMutation } from "./castMembersSlice";
import { HtmlHTMLAttributes, useEffect, useState } from "react";
import { CastMember } from "../../types/CastMembers";
import { useParams } from "react-router-dom";
import { CastMemberForm } from "./components/CastMemberForm";

export const EditCastMember = () => {
    const id = useParams().id || "";
    const { data: castMember, isFetching } = useGetCastMemberQuery({ id });

    const { enqueueSnackbar } = useSnackbar();
    const [updateCastMember, status] = useUpdateCastMemberMutation();
    const [isDisabled, setIsDisabled] = useState(false);
    const [castMemberState, setCastMemberState] = useState<CastMember>(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCastMemberState({ ...castMemberState, [name]: value });
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await updateCastMember(castMemberState);
    }

    useEffect(() => {
        if(castMember) {
            setCastMemberState(castMember.data);
        }
    }, [castMember]);

    useEffect(() => {
        if (status.isSuccess) {
            enqueueSnackbar('Cast member updated', { variant: 'success' });
        }
        if (status.isError) {
            enqueueSnackbar('Cast member not updated', { variant: 'error' });

        }
    }, [enqueueSnackbar, status.error, status.isSuccess])

    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h4">Edit Cast Member</Typography>
                    </Box>
                </Box>

                <CastMemberForm 
                    castMember={castMemberState}
                    isDisabled={status.isLoading}
                    isLoading={isFetching || status.isLoading}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                />
            </Paper>
        </Box>
    )
}