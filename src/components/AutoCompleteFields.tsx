import React from "react";
import { Genre } from "../types/Genre";
import { Category } from "../types/Categories";
import { CastMember } from "../types/CastMembers";
import { Autocomplete, AutocompleteRenderInputParams, TextField } from "@mui/material";

type Props = {
    name: string;
    label: string;
    isLoading: boolean;
    isDisabled: boolean;
    values?: (Genre | Category | CastMember)[];
    options?: (Genre | Category | CastMember)[];
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AutoCompleteFields = ({
    name,
    label,
    isLoading,
    isDisabled,
    values,
    options,
    handleChange
}: Props) => {
    const handleRenderOption = (
        props: React.HTMLAttributes<HTMLLIElement>,
        option: Category | Genre | CastMember
    ) => (
        <li {...props} key={option.id}>
            {option.name}
        </li>
    );

    const isIdEqual = (
        option: Genre | Category | CastMember,
        value: Genre | Category | CastMember
    ): boolean => option.id === value.id;

    const handleOnChange = (
        _e: React.ChangeEvent<{}>,
        newValue: (Genre | Category | CastMember)[]
    ) => {
        handleChange({ target: { name, value: newValue } } as any);
    };

    const renderInput = (params: AutocompleteRenderInputParams) => (
        <TextField {...params} label={label} data-testid={`${name}-input`}/>
    );

    return <Autocomplete
        multiple
        data-testid={`${name}-search`}
        loading={isLoading}
        options={options || []}
        value={values}
        disabled={isDisabled || !options}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={isIdEqual}
        renderOption={handleRenderOption}
        onChange={handleOnChange}
        renderInput={renderInput}
    />
};