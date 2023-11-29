import { Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Link, Paper, Switch, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCategoryById } from "./categorySlice";
import { useState } from "react";

export const CategoryEdit = () => {
    const id = useParams().id || "";
    const [isdisabled, setIsdisabled] = useState(false);
    const category = useAppSelector((state) => selectCategoryById(state, id));

    const handleChange = (e: any) => { }

    const handleToggle = (e: any) => { }

    return (
        <Box>
            <Paper>
                <Box p={2}>
                    <Box mb={2}>
                        <Typography variant="h4">Edit Category</Typography>
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