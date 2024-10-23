import { Dispatch, FC, SetStateAction } from "react";
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import { PATIENT_STATUS, PatientStatus } from "../../utils/constants";

interface Props {
    option: PatientStatus;
    setOption: Dispatch<SetStateAction<PatientStatus>>;
}

export const DropDown: FC<Props> = ({ option, setOption }) => {
    const handleChange = (event: SelectChangeEvent<PatientStatus>) => {
        setOption(event.target.value as PatientStatus);
    };

    return (
        <FormControl sx={{ width: { md: "30%", xs: "80%" }, mb: "10px" }}>
            <InputLabel id="patient-status-label">Patient Status</InputLabel>
            <Select labelId="patient-status-label" value={option} onChange={handleChange} label="Patient Status">
                {PATIENT_STATUS.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                        {status.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
