import { Resolver } from "react-hook-form";
import { PatientInput } from "./types";

export const resolver: Resolver<PatientInput> = async (values) => {
    const errors: Record<string, any> = {};

    if (!values.firstName) {
        errors.firstName = {
            type: "required",
            message: "First name is required."
        };
    }

    if (!values.lastName) {
        errors.lastName = {
            type: "required",
            message: "Last name is required."
        };
    }

    if (!values.dob) {
        errors.dob = {
            type: "required",
            message: "Date of Birth is required."
        };
    }

    if (values.addresses.length === 0) {
        errors.addresses = {
            type: "required",
            message: "At least one address is required."
        };
    }

    return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors: errors
    };
};
