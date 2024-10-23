import { FC, useMemo, useState } from "react";
import { PatientStatus } from "../../utils/constants";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/authContext";
import { fetchPatientData } from "../../actions/patient";
import { Modal, Pagination, PatientCard, PatientForm } from "../../components";
import { Typography, Box } from "@mui/material";
import { PatientInput, PatientOutput } from "../../components/PatientForm/types";

interface Props {
    keyword: string;
    status: PatientStatus;
}

export const DisplayPatient: FC<Props> = ({ keyword, status }) => {
    const [perPage, _] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const { isAuthenticated } = useAuth();
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<PatientOutput | null>(null);

    const {
        data = { patients: [], totalPatients: 0 },
        error,
        isLoading
    } = useQuery({
        queryKey: ["patients", { perPage, currentPage, keyword, status }],
        queryFn: async () => {
            const result = await fetchPatientData({ perPage, currentPage, keyword, status });
            if (Array.isArray(result.patients)) {
                return result;
            } else {
                return {
                    patients: [],
                    totalPatients: 0
                };
            }
        },
        enabled: isAuthenticated
    });

    const [showPagination, totalPage] = useMemo(() => {
        if (isLoading || !!error || !data.patients?.length) return [false, 0];
        return [true, Math.ceil(data.totalPatients / perPage)];
    }, [error, isLoading, data, perPage]);

    const patientsData = useMemo(() => {
        if (!Array.isArray(data.patients)) return [];
        return data.patients as PatientOutput[];
    }, [data]);

    const handleSetItem = (id: string) => {
        const existingPatient = patientsData.find((item) => item._id === id);
        if (existingPatient) {
            setSelectedItem(existingPatient);
            setShowUpdateModal(true);
        } else {
            setSelectedItem(null);
        }
    };

    if (error) {
        return <Typography variant="body1">An error occurred while fetching patients.</Typography>;
    }

    if (isLoading) {
        return <Typography variant="body1">Loading...</Typography>;
    }

    return (
        <>
            {patientsData.length > 0 ? (
                <>
                    <Box
                        sx={{
                            mt: 2,
                            overflow: "hidden",
                            display: "flex",
                            justifyContent: "space-around",
                            flexWrap: "wrap",
                            alignItems: "flex-start",
                            width: "100%",
                            gap: { xs: "10px" }
                        }}
                    >
                        {patientsData.map((patient, index) => (
                            <PatientCard
                                key={`${patient.firstName}${index}`}
                                patient={patient}
                                handleEdit={() => handleSetItem(patient?._id ?? "")}
                            />
                        ))}
                    </Box>
                    <Modal
                        isOpen={showUpdateModal && !!selectedItem}
                        onClose={() => setShowUpdateModal(false)}
                        title="Update Patient Info"
                    >
                        <PatientForm
                            isUpdating
                            id={selectedItem?._id}
                            prevInfo={selectedItem as PatientInput}
                            onModalClose={() => setShowUpdateModal(false)}
                        />
                    </Modal>

                    {showPagination && (
                        <Pagination
                            currentPage={currentPage}
                            totalCount={data.totalPatients}
                            totalPage={totalPage}
                            setCurrentPage={setCurrentPage}
                        />
                    )}
                </>
            ) : (
                <Typography variant="body1">No patients found. Please check your search criteria.</Typography>
            )}
        </>
    );
};
