import { Dialog, Typography, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import the close icon
import React from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    fullWidth?: boolean;
}

export const Modal: React.FC<Props> = ({ isOpen, onClose, title, children, fullWidth = false }) => {
    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth={fullWidth} sx={{ minWidth: "800px" }}>
            <Box padding={3}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2
                    }}
                >
                    <Typography variant="h5" color="primary.contrastText">
                        {title}
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: "primary.contrastText",
                            "&:hover": {
                                cursor: "pointer"
                            }
                        }}
                    >
                        <CloseIcon /> {/* Close icon */}
                    </IconButton>
                </Box>
                <Box>{children}</Box>
            </Box>
        </Dialog>
    );
};
