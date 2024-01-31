import { Button, InputLabel, TextField } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";

interface Props {
    onChange: (file: File) => void;
}

export const InputFile: React.FC<Props> = ({ onChange }) => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedFiles(event.target.files);
    };

    const handleFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <TextField
                type="text"
                placeholder="Select a file"
                onClick={handleFileInput}
                value={selectedFiles?.length ? selectedFiles[0].name : ""}
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
                ref={fileInputRef}
                onChange={handleChange}
                style={{ display: 'none' }}

            />
        </>
    )
};