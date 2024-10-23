import { FC } from "react";
import { Footer, Header } from "../components";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

export const AppLayout: FC = () => {
    return (
        <>
            <Header />
            <Container component="main" sx={{ flex: 1, py: 3 }}>
                <Outlet />
            </Container>
            <Footer />
        </>
    );
};
