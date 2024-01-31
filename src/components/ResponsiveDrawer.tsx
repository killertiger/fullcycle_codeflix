import { Divider, List, ListItem, Toolbar, Typography } from "@mui/material";

const drawerWidth = 240;

type Props = {
    open: boolean,
    onClose: () => void,
}

export function ResponsiveDrawer() {
    const routes = [
        { path: "/", name: "Categories" },
        { path: "/cast-members", name: "Cast Members" },
        { path: "/genres", name: "Genres" },
        { path: "/videos", name: "Videos" },

    ];

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Codeflix
                </Typography>
                <Divider/>
                <List>
                    {routes.map((route) => (
                        <ListItem disablePadding>
                            <Typography key={route.name}>{route.name}</Typography>
                        </ListItem>
                    ))}
                </List>

            </Toolbar>
        </div>
    )

    return <div>ResponsiveDrawer</div>
}