import React from "react";
import { FormControl, Grid2 as Grid, IconButton, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { Control, Controller, FieldErrors, FieldArrayWithId } from "react-hook-form";
import { Delete } from "@mui/icons-material";
import { PatientInput } from "./types";

import { US_STATES } from "../../utils/constants";
import { TextField } from "../Input";

interface Props {
    index: number;
    removeAddress: (index: number) => void;
    control: Control<PatientInput, any>;
    errors: FieldErrors<PatientInput>;
    field: FieldArrayWithId<PatientInput, "addresses", "id">;
}

export const AddressForm: React.FC<Props> = ({ index, removeAddress, control, errors }) => {
    return (
        <React.Fragment key={index}>
            <Grid size={12}>
                <Typography variant="h6">Address {index + 1}</Typography>
                {index > 0 && (
                    <IconButton onClick={() => removeAddress(index)}>
                        <Delete />
                    </IconButton>
                )}
            </Grid>
            <Grid size={12}>
                <Controller
                    name={`addresses.${index}.street1`}
                    control={control}
                    render={({ field }) => (
                        <TextField
                            label="Address 1"
                            {...field}
                            error={!!errors.addresses?.[index]?.street1}
                            helperText={errors.addresses?.[index]?.street1?.message}
                        />
                    )}
                />
            </Grid>
            <Grid size={12}>
                <Controller
                    name={`addresses.${index}.street2`}
                    control={control}
                    render={({ field }) => (
                        <TextField
                            label="Address 2"
                            {...field}
                            error={!!errors.addresses?.[index]?.street2}
                            helperText={errors.addresses?.[index]?.street2?.message}
                        />
                    )}
                />
            </Grid>
            <Grid size={4}>
                <Controller
                    name={`addresses.${index}.city`}
                    control={control}
                    render={({ field }) => (
                        <TextField
                            label="City"
                            {...field}
                            error={!!errors.addresses?.[index]?.city}
                            helperText={errors.addresses?.[index]?.city?.message}
                        />
                    )}
                />
            </Grid>
            <Grid size={4}>
                <Controller
                    name={`addresses.${index}.state`}
                    control={control}
                    render={({ field }) => (
                        <FormControl sx={{ width: "100%" }}>
                            <InputLabel>State</InputLabel>
                            <Select {...field} sx={{ width: "100%" }}>
                                {US_STATES.map((state, index) => (
                                    <MenuItem key={`${state.abbreviation}${index}`} value={state.abbreviation}>
                                        {state.abbreviation}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                />
            </Grid>
            <Grid size={4}>
                <Controller
                    name={`addresses.${index}.zip`}
                    control={control}
                    render={({ field }) => (
                        <TextField
                            label="Zip Code"
                            {...field}
                            error={!!errors.addresses?.[index]?.zip}
                            helperText={errors.addresses?.[index]?.zip?.message}
                        />
                    )}
                />
            </Grid>
        </React.Fragment>
    );
};
