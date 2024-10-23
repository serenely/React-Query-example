import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <Box>
      <Typography variant="h2" color="primary"> 404 NotFound</Typography>
      <Link to="/">Go Home</Link>
    </Box>
  );
};
