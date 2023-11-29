import { Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Link, Switch, TextField } from '@mui/material';
import { Category } from '../categorySlice';

type Props = {
    category: Category;
    isDisabled?: boolean;
    isLoading?: boolean;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };

export function CategoryForm({
    category,
    isDisabled = false,
    isLoading = false,
    onSubmit,
    handleChange,
    handleToggle,
}:Props) {
    return (
        <Box p={2}>
            <form>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                required
                                name="name"
                                label="name"
                                value={category.name}
                                disabled={isDisabled}
                                onChange={handleChange} />
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
                                onChange={handleChange} />
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
                                    />
                                }
                            />
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" gap={2}>
                            <Button variant="contained" component={Link} href="/categories">
                                Back
                            </Button>

                            <Button type="submit" variant="contained" color="secondary" disabled={isDisabled}>
                                Save
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}