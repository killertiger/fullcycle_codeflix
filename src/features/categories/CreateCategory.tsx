import { Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Link, Paper, Switch, TextField, Typography } from "@mui/material";
import { Category } from "./categorySlice";
import { useState } from "react";

export const CategoryCreate = () => {
    const [isdisabled, setIsdisabled] = useState(false);
    const [category, setCategory] = useState<Category>({
        id: "",
        name: "",
        is_active: false,
        created_at: "",
        updated_at: "",
        deleted_at: "",
        description: "",
    });

    const handleChange = (e: any) => { }

    const handleToggle = (e: any) => { }

    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h4">Create Category</Typography>
                    </Box>
                </Box>

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
                                        disabled={isdisabled}
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
                                        disabled={isdisabled}
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
                                                inputProps={{"aria-label": "controlled"}}
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

                                    <Button type="submit" variant="contained" color="secondary" disabled={isdisabled}>
                                        Save
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Paper>
        </Box>
    )
}