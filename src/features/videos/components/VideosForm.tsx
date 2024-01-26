import { Autocomplete, Box, Button, FormControl, Grid, TextField } from "@mui/material";
import { Video } from "../../../types/Videos";
import { Link } from "react-router-dom";
import { Genre } from "../../../types/Genre";
import { Category } from "../../../types/Categories";
import { CastMember } from "../../../types/CastMembers";

type Props = {
    video: Video;
    genres?: Genre[];
    categories?: Category[];
    cast_members?: CastMember[];
    isDisabled?: boolean;
    isLoading?: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function VideosForm({
    video,
    genres,
    categories,
    cast_members,
    isDisabled = false,
    isLoading = false,
    handleSubmit,
    handleChange,
}: Props) {
    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                name="title"
                                label="Title"
                                value={video.title}
                                disabled={isDisabled}
                                onChange={handleChange}
                                inputProps={{ "data-testid": "title" }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                name="description"
                                label="Description"
                                value={video.description}
                                disabled={isDisabled}
                                onChange={handleChange}
                                inputProps={{ "data-testid": "description" }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                name="year_launched"
                                label="Year Launched"
                                value={video.description}
                                disabled={isDisabled}
                                onChange={handleChange}
                                inputProps={{ "data-testid": "year_launched" }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                name="duration"
                                label="Duration"
                                value={video.duration}
                                disabled={isDisabled}
                                onChange={handleChange}
                                inputProps={{ "data-testid": "duration" }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            disablePortal
                            multiple
                            loading={isLoading}
                            id="combo-box-demo"
                            options={categories || []}
                            value={video.categories}
                            disabled={isDisabled || !categories}
                            getOptionLabel={(option) => option.name}
                            renderOption={(props, option) => (
                                <li {...props} key={option.id}>
                                    {option.name}
                                </li>
                            )}
                            onChange={(_, newValue) => {
                                handleChange({
                                    target: {
                                        name: "categories",
                                        value: newValue,
                                    }
                                } as any);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Categories"
                                    data-testid="categories-input"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            disablePortal
                            multiple
                            loading={isLoading}
                            id="combo-box-demo"
                            options={genres || []}
                            value={video.genres}
                            disabled={isDisabled || !genres}
                            getOptionLabel={(option) => option.name}
                            renderOption={(props, option) => (
                                <li {...props} key={option.id}>
                                    {option.name}
                                </li>
                            )}
                            onChange={(_, newValue) => {
                                handleChange({
                                    target: {
                                        name: "genres",
                                        value: newValue,
                                    }
                                } as any);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Genres"
                                    data-testid="genres-input"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            disablePortal
                            multiple
                            loading={isLoading}
                            id="combo-box-demo"
                            options={cast_members || []}
                            value={video.cast_members}
                            disabled={isDisabled || !cast_members}
                            getOptionLabel={(option) => option.name}
                            renderOption={(props, option) => (
                                <li {...props} key={option.id}>
                                    {option.name}
                                </li>
                            )}
                            onChange={(_, newValue) => {
                                handleChange({
                                    target: {
                                        name: "cast_members",
                                        value: newValue,
                                    }
                                } as any);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Cast Members"
                                    data-testid="cast_members-input"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" gap={2}>
                            <Button variant="contained" component={Link} to="/videos">Back</Button>

                            <Button type="submit"
                                variant="contained"
                                color="secondary"
                                disabled={isDisabled || isLoading}>
                                Save
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}