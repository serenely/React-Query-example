import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Box, Button, Container, TextField, Typography, Link } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { RegisterInputs } from "./types";
import { registerResolver } from "./resolver";
import { formContainerStyle, loginContainerStyle, inputContainerStyle } from "../Login/style";
import axios from "axios";

export const Register = () => {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterInputs>({
        defaultValues: { firstName: "", lastName: "", email: "", password: "" },
        resolver: registerResolver
    });

    const { isAuthenticated, signUp } = useAuth();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
        const { email, firstName, lastName, password } = data;
        try {
            await signUp(firstName, lastName, email, password);
            setErrorMessage(null);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Unknown Error occured");
            }
        }
    };

    return (
        <Container sx={loginContainerStyle}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={formContainerStyle}>
                    <Typography variant="h4">Register</Typography>
                    {errorMessage && (
                        <Typography variant="body2" color="error">
                            {errorMessage}
                        </Typography>
                    )}
                    <Box sx={inputContainerStyle}>
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    label="First Name"
                                    {...field}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                    sx={{ width: "100%" }}
                                />
                            )}
                        />
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    label="Last Name"
                                    {...field}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                    sx={{ width: "100%" }}
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    label="Email"
                                    {...field}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    sx={{ width: "100%" }}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    label="Password"
                                    type="password"
                                    {...field}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    sx={{ width: "100%" }}
                                />
                            )}
                        />
                    </Box>
                    <Button variant="outlined" type="submit">
                        Register
                    </Button>
                    <Typography variant="body2">
                        {"Have you already registered?"}
                        <Link component={RouterLink} to="/signin">
                            Sign In
                        </Link>
                    </Typography>
                </Box>
            </form>
        </Container>
    );
};
