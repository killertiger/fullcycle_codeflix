import React from 'react';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { keycloak } from '../keycloakConfig';

export function Header({
    toggleTheme,
    theme,
    handleDrawerToggle,
}: {
    toggleTheme: () => void,
    theme: string,
    handleDrawerToggle?: () => void,
}) {
    return (
        <Box>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2, display: { sm: "none" } }}
                    onClick={handleDrawerToggle}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
                    {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>

                <Button color="inherit" onClick={() => keycloak.logout()}>Logout</Button>
            </Toolbar>
        </Box>
    )
}