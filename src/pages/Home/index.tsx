import { useEffect, useState } from "react";
import { Box, Button, Container } from "@mui/material";

import { Modal, PatientForm } from "../../components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { DebouncedInput } from "../../components/DebounceInput";
import { PatientStatus } from "../../utils/constants";
import { DropDown } from "../../components/DropDown";
import { DisplayPatient } from "./DisplayData";

export const Home = () => {
    const [isPatientModalOpen, setIsPatientModalOpen] = useState<boolean>(false);
    const [status, setStatus] = useState<PatientStatus>(PatientStatus.NOT_VALUE);

    const [keyword, setKeyword] = useState("");
    const [debouncedKeyword, setDebouncedKeyword] = useState("");
    const { isAuthenticated } = useAuth();

    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/signin");
        }
    }, [isAuthenticated]);

    const toggleModalOpen = () => {
        setIsPatientModalOpen((prev) => !prev);
    };

    return (
        <Container sx={{ height: "100%" }}>
            <Box
                justifyContent="space-between"
                display="flex"
                alignItems="center"
                mt={5}
                sx={{ flexDirection: { xs: "column", md: "row" } }}
            >
                <DebouncedInput value={keyword} setValue={setKeyword} setDebounceValue={setDebouncedKeyword} />
                <DropDown option={status} setOption={setStatus} />
                <Button
                    variant="outlined"
                    onClick={toggleModalOpen}
                    disabled={isPatientModalOpen}
                    sx={{ width: { md: "20%", xs: "80%" } }}
                >
                    Create Patient
                </Button>
            </Box>
            <Box sx={{ position: "relative", display: "block", height: "70vh" }}>
                <DisplayPatient keyword={debouncedKeyword} status={status} />
            </Box>
            <Modal isOpen={isPatientModalOpen} onClose={toggleModalOpen} title="Create Patient">
                <PatientForm isUpdating={false} onModalClose={toggleModalOpen}/>
            </Modal>
        </Container>
    );
};
