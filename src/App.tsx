import { FC } from "react";
import { AppProvider } from "./providers";
import { Box } from "@mui/material";

const appStyle = { display: "flex", flexDirection: "column", minHeight: "100vh" };

const App: FC = () => {
    return (
        <Box className="App" sx={appStyle}>
            <AppProvider />
        </Box>
    );
};

export default App;
