import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useAuth } from "../../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";

export const Header = () => {
    const { user, isAuthenticated, signOut } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const handleSignIn = () => {
        if (location.pathname !== "/signin") {
            navigate("/signin");
        }
    };

    const handleLogOut = () => signOut();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Finni Health Patient Management
                </Typography>

                {isAuthenticated ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body1" sx={{ marginRight: 2 }}>
                            Welcome, {user?.firstName} {user?.lastName}
                        </Typography>
                        <Button color="inherit">Profile</Button>
                        <Button onClick={handleLogOut} color="inherit">
                            Logout
                        </Button>
                    </Box>
                ) : (
                    <Button color="inherit" onClick={handleSignIn}>
                        Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};
