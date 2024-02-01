import DeleteIcon from '@mui/icons-material/Delete';
import FileIcon from '@mui/icons-material/FileCopy';
import { IconButton, TextField } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";

interface Props {
    onAdd: (file: FileList) => void;
    onRemove: (file: File) => void;
}

export const InputFile: React.FC<Props> = ({ onAdd, onRemove }: Props) => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedFiles(event.target.files);
        onAdd(event.target.files as FileList);
    };

    const handleFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleClear = () => {
        setSelectedFiles(null);
        if (selectedFiles) {
            onRemove(selectedFiles[0]);
        }
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