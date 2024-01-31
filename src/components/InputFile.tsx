import { Button, InputLabel, TextField } from "@mui/material";
import { ChangeEvent } from "react";

interface Props {
    onChange: (file: File) => void;
}

export const InputFile: React.FC<Props> = ({ onChange }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => { };

    return (
        <>
            <TextField
                type="text"
                placeholder="Select a file"
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <label htmlFor="file">
                            <Button
                                variant="contained"
                                component="span"
                                color="primary"
                                sx={{ ml: 1 }}
                            >
                                Select
                            </Button>
                        </label>
                    )
                }}
            />
            <input
                accept="*"
                type="file"
                id="inputFile"
                onChange={handleChange}
                style={{ display: 'none' }}

            />
        </>
    )
};