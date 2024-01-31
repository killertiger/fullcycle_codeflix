import { Button, IconButton, InputLabel, TextField } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import FileIcon from '@mui/icons-material/FileCopy';

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

    const handleClear = () => {
        setSelectedFiles(null);
    };

    return (
        <>
            <TextField
                type="text"
                placeholder="Select a file"
                // onClick={handleFileInput}
                value={selectedFiles?.length ? selectedFiles[0].name : ""}
                InputProps={{
                    readOnly: true,
                    endAdornment:
                        selectedFiles?.length ? (
                            <IconButton onClick={handleClear}>
                                <DeleteIcon />
                            </IconButton>
                        ) : (
                            <IconButton onClick={handleFileInput}>
                                <FileIcon />
                            </IconButton>
                        )
                }}
            />
            < input
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