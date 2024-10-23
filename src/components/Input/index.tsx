import React from "react";
import { FormControl, TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from "@mui/material";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

type Props<TFieldValues extends FieldValues> = Omit<MuiTextFieldProps, "name"> & {
    label: string;
    name: Path<TFieldValues>;
    register?: UseFormRegister<TFieldValues>;
    error?: boolean;
};

export const TextField = React.forwardRef(
    <TFieldValues extends FieldValues>(
        { label, name, register, ...props }: Props<TFieldValues>,
        ref: React.Ref<HTMLDivElement>
    ) => {
        return (
            <FormControl sx={{ width: "100%" }}>
                <MuiTextField
                    label={label}
                    {...(register ? register(name) : {})}
                    {...props}
                    ref={ref}
                    sx={{ width: "100%" }}
                />
                {}
            </FormControl>
        );
    }
);

TextField.displayName = "TextField";
