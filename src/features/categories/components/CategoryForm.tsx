import { Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Switch, TextField } from '@mui/material';
import { Category } from '../categorySlice';
import { Link } from 'react-router-dom';

type Props = {
    category: Category;
    isDisabled?: boolean;
    isLoading?: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CategoryForm({
    category,
    isDisabled = false,
    isLoading = false,
    handleSubmit,
    handleChange,
    handleToggle,
}: Props) {
    return (
        <Box p={2}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                name="name"
                                label="name"
                                value={category.name}
                                disabled={isDisabled}
                                onChange={handleChange}
                                inputProps={{ "data-testid": "name"}}
                                />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                name="description"
                                label="description"
                                value={category.description}
                                disabled={isDisabled}
                                onChange={handleChange}
                                inputProps={{ "data-testid": "description"}}
                                />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormGroup>
                            <FormControlLabel
                                label="Active"
                                control={
                                    <Switch
                                        name="is_active"
                                        color="secondary"
                                        onChange={handleToggle}
                                        checked={category.is_active}
                                        inputProps={{ "aria-label": "controlled" }}
                                        data-testid="is_active"
                                        disabled={isDisabled}
                                    />
                                }
                            />
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" gap={2}>
                            <Button variant="contained" component={Link} to="/categories">
                                Back
                            </Button>

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
    )
}