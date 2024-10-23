import { TextField } from "@mui/material";
import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect } from "react";

interface Props {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    setDebounceValue: Dispatch<SetStateAction<string>>;
}

export const DebouncedInput: FC<Props> = ({ value, setValue, setDebounceValue }) => {
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value.trim());
        }, 1000);
        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    const handleCange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <TextField
            sx={{ width: { md: "40%", xs: "80%" }, mb: "10px" }}
            value={value}
            onChange={handleCange}
            type="text"
            placeholder="Start typing to search .."
        />
    );
};
