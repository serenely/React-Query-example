import { Resolver } from "react-hook-form";
import { RegisterInputs } from "./types";

export const registerResolver: Resolver<RegisterInputs> = async (values) => {
    const errors: Record<string, { type: string; message: string }> = {};

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

    if (!values.email) {
        errors.email = {
            type: "required",
            message: "Email is required."
        };
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = {
            type: "pattern",
            message: "Entered value does not match email format."
        };
    }

    if (!values.password) {
        errors.password = {
            type: "required",
            message: "Password is required."
        };
    } else if (values.password.length < 6) {
        errors.password = {
            type: "minLength",
            message: "Password must be at least 6 characters."
        };
    }

    return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors: errors
    };
};
