import { Autocomplete, Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import { Video } from "../../../types/Videos";
import { Link } from "react-router-dom";
import { Genre } from "../../../types/Genre";
import { Category } from "../../../types/Categories";
import { CastMember } from "../../../types/CastMembers";
import { AutoCompleteFields } from "../../../components/AutoCompleteFields";
import { Rating } from "../../../components/Rating";
import { RatingsList } from "../../../components/RatingsList";

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

const ratingOptions = [
    { label: "L", value: "L" },
    { label: "10", value: "10" },
    { label: "12", value: "12" },
    { label: "14", value: "14" },
    { label: "16", value: "16" },
    { label: "18", value: "18" },
]

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
                        <AutoCompleteFields
                            name="categories"
                            label="Categories"
                            options={categories}
                            values={video.categories}
                            isDisabled={isDisabled}
                            isLoading={isLoading}
                            handleChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AutoCompleteFields
                            name="genres"
                            label="Genres"
                            options={genres}
                            values={video.genres}
                            isDisabled={isDisabled}
                            isLoading={isLoading}
                            handleChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AutoCompleteFields
                            name="cast_members"
                            label="Cast Members"
                            options={cast_members}
                            values={video.cast_members}
                            isDisabled={isDisabled}
                            isLoading={isLoading}
                            handleChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel
                                component="legend"
                                sx={{ mb: 2 }}
                            >
                                Rating
                            </FormLabel>
                            <RadioGroup
                                name="rating"
                                value={video.rating}
                                onChange={handleChange}
                                row
                            >
                                <RatingsList isDisabled={isDisabled} />
                            </RadioGroup>
                        </FormControl>
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