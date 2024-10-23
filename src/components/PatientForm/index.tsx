import React, { FC, useState } from "react";
import { useForm, SubmitHandler, Controller, useFieldArray } from "react-hook-form";
import {
    Button,
    Container,
    Grid2 as Grid,
    Typography,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import { PATIENT_STATUS, PatientStatus } from "../../utils/constants";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { TextField } from "../../components/Input";
import { AddressForm } from "./Address";
import { PatientInput } from "./types";
import { resolver } from "./resolver";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOnePatient, updateOnePatient } from "../../actions/patient";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const defaultValues: PatientInput = {
    firstName: "",
    lastName: "",
    dob: "",
    status: PatientStatus.NOT_VALUE,
    addresses: [{ street1: "", street2: "", city: "", state: "", zip: "" }],
    customFields: [{ fieldName: "", fieldValue: "" }]
};

interface Props {
    prevInfo?: PatientInput;
    isUpdating: boolean;
    id?: string;
    onModalClose: () => void;
}

export const PatientForm: FC<Props> = ({ prevInfo, isUpdating, id, onModalClose }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<PatientInput>({ defaultValues: isUpdating ? prevInfo : defaultValues, resolver });

    const {
        fields: addressFields,
        append: appendAddress,
        remove: removeAddress
    } = useFieldArray({
        control,
        name: "addresses"
    });

    const {
        fields: configFields,
        append: appendConfigurable,
        remove: removeConfigurable
    } = useFieldArray({
        control,
        name: "customFields"
    });

    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const { signOut } = useAuth();
    const queryClient = useQueryClient();
    const addMutation = useMutation({
        mutationFn: async (data: PatientInput) => {
            if (id) {
                updateOnePatient(id, data);
            } else {
                addOnePatient(data);
            }
        },
        onSuccess: () => {
            setErrorMsg(null);
            reset();
            if (isUpdating) {
                onModalClose();
            }
            queryClient.invalidateQueries();
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                if (error.status === 401) {
                    signOut();
                } else {
                    setErrorMsg(error.message);
                }
            } else {
                setErrorMsg("Unknown Error Occurred");
            }
        }
    });

    const onSubmit: SubmitHandler<PatientInput> = (data: PatientInput) => {
        addMutation.mutate(data);
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Patient Information
            </Typography>
            {errorMsg && (
                <Typography variant="body2" color="error">
                    {errorMsg}
                </Typography>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    {/* First Name Field */}
                    <Grid size={6}>
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    label="First name"
                                    {...field}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={6}>
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    label="Last name"
                                    {...field}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={6}>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <FormControl sx={{ width: "100%" }}>
                                    <InputLabel>Status</InputLabel>
                                    <Select {...field} sx={{ width: "100%" }}>
                                        {PATIENT_STATUS.map((status, index) => (
                                            <MenuItem key={`${status.value}${index}`} value={status.value}>
                                                {status.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>

                    <Grid size={6}>
                        <Controller
                            name="dob"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    label="Date of Birth"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    {...field}
                                    error={!!errors.dob}
                                    helperText={errors.dob?.message}
                                />
                            )}
                        />
                    </Grid>

                    {addressFields.map((field, index) => (
                        <AddressForm
                            field={field}
                            key={index}
                            index={index}
                            removeAddress={removeAddress}
                            control={control}
                            errors={errors}
                        />
                    ))}

                    <Grid size={12}>
                        <Button
                            type="button"
                            onClick={() =>
                                appendAddress({
                                    street1: "",
                                    street2: "",
                                    city: "",
                                    state: "",
                                    zip: ""
                                })
                            }
                            startIcon={<AddIcon />}
                        >
                            Add Another Address
                        </Button>
                    </Grid>

                    {/* Dynamic Configurable Section */}
                    {configFields.map((field, index) => (
                        <React.Fragment key={field.id}>
                            <Grid size={12}>
                                <Typography variant="h6">Custom Field {index + 1}</Typography>
                                <IconButton onClick={() => removeConfigurable(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                            <Grid size={6}>
                                <Controller
                                    name={`customFields.${index}.fieldName`}
                                    control={control}
                                    render={({ field }) => <TextField label="Field Name" {...field} />}
                                />
                            </Grid>
                            <Grid size={6}>
                                <Controller
                                    name={`customFields.${index}.fieldValue`}
                                    control={control}
                                    render={({ field }) => <TextField label="Field Value" {...field} />}
                                />
                            </Grid>
                        </React.Fragment>
                    ))}

                    <Grid size={12}>
                        <Button
                            type="button"
                            onClick={() =>
                                appendConfigurable({
                                    fieldName: "",
                                    fieldValue: ""
                                })
                            }
                            startIcon={<AddIcon />}
                        >
                            Add Custom Field
                        </Button>
                    </Grid>

                    {/* Submit Button */}
                    <Grid size={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};
