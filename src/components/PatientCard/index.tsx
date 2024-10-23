import { FC } from "react";
import { Card, CardContent, Typography, Button, ButtonGroup } from "@mui/material";
import { PatientOutput } from "../PatientForm/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePatient } from "../../actions/patient";
import axios from "axios";
import { useAuth } from "../../context/authContext";

interface PatientCardProps {
    patient: PatientOutput;
    handleEdit: () => void;
}

export const PatientCard: FC<PatientCardProps> = ({ patient, handleEdit }) => {
    const queryClient = useQueryClient();
    const { signOut } = useAuth();

    const deleteMutate = useMutation({
        mutationFn: () => deletePatient(patient.id ?? patient._id),
        onSuccess: () => {
            queryClient.invalidateQueries(); // Refreshes the queries after successful deletion
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    signOut(); // Sign out if unauthorized
                }
            }
        }
    });

    return (
        <Card
            variant="outlined"
            sx={{
                width: { xs: "45%", md: "30%", lg: "24%" },
                height: {
                    xs: "160px", // Adjusted height for the button
                    md: "160px",
                    lg: "190px"
                }
            }}
        >
            <CardContent>
                <Typography variant="h6">
                    {patient.firstName} {patient.middleName ? patient.middleName : ""}{" "}
                    {patient.lastName ? patient.lastName : ""}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    DOB: {new Date(patient.dob).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Status: {patient.status}
                </Typography>
                <ButtonGroup fullWidth>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ marginTop: "10px" }}
                        onClick={() => deleteMutate.mutate()}
                    >
                        Delete
                    </Button>
                    <Button variant="outlined" color="secondary" sx={{ marginTop: "10px" }} onClick={handleEdit}>
                        Edit
                    </Button>
                </ButtonGroup>
            </CardContent>
        </Card>
    );
};
