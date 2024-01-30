import { Box, Typography } from "@mui/material";

const backgroundColors = {
    L: "#00FF00",
    10: "#00FFFF",
    12: "#0000FF",
    14: "#FF00FF",
    16: "#FF0000",
    18: "#000000",
}

type Props = {
    rating: "L" | "10" | "12" | "14" | "16" | "18";
}


export function Rating({ rating }: Props) {
    return (
        <Box sx={{
            "& >:first-child": { mr: 0 },
            width: 40,
            height: 40,
            borderRadius: "4px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: backgroundColors[rating],
        }}>
            <Typography>{rating}</Typography>
        </Box>
    )
}