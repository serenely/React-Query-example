import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { footerStyle } from "./style";

export const Footer: FC = () => {
    return (
        <Box component="footer" sx={footerStyle}>
            <Typography variant="body2" color="textSecondary">
                © 2024 Finii Health Patient Management
            </Typography>
        </Box>
    );
};

export default Footer;
