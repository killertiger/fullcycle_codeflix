import DeleteIcon from '@mui/icons-material/Delete';
import FileIcon from '@mui/icons-material/FileCopy';
import { IconButton, TextField } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";

interface Props {
    onAdd: (file: File) => void;
    onRemove: (file: File) => void;
}

export const InputFile: React.FC<Props> = ({ onAdd, onRemove }: Props) => {
    const [selectedFiles, setSelectedFiles] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : undefined;
        if (!file) return;
        setSelectedFiles(file);
        onAdd(file);
    };

    const handleFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleClear = () => {
        setSelectedFiles(null);
        if (selectedFiles) {
            onRemove(selectedFiles);
        }
    };

    return (
        <>
            <TextField
                type="text"
                placeholder="Select a file"
                // onClick={handleFileInput}
                value={selectedFiles?.name || ""}
                InputProps={{
                    readOnly: true,
                    endAdornment:
                        selectedFiles ? (
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