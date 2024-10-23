import React, { useEffect, useState } from "react";
import { Link, Box, Button, Container, Typography } from "@mui/material";
import { TextField } from "../../components/Input";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useAuth } from "../../context/authContext";
import { resolver } from "./resolver";
import { LoginInputs } from "./types";
import { formContainerStyle, inputContainerStyle, loginContainerStyle } from "./style";
import axios from "axios";

export const Login: React.FC = () => {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginInputs>({ defaultValues: { email: "", password: "" }, resolver });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigate = useNavigate();
    const { isAuthenticated, signIn } = useAuth();

    const onSubmit: SubmitHandler<LoginInputs> = async (data: LoginInputs) => {
        const { email, password } = data;
        try {
            await signIn(email, password);
            setErrorMessage(null);
        } catch (error) {
            if (axios.isAxiosError(error) && error.status === 400) {
                setErrorMessage("Email or Password is Invalid");
            } else {
                setErrorMessage("Unknown Error occured.");
            }
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    return (
        <Container sx={loginContainerStyle}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={formContainerStyle}>
                    <Typography variant="h4">Log in</Typography>
                    {errorMessage && (
                        <Typography variant="body2" color="error" >
                            {errorMessage}
                        </Typography>
                    )}
                    <Box sx={inputContainerStyle}>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    label="Email"
                                    {...field}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
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
                                />
                            )}
                        />
                    </Box>
                    <Button variant="outlined" type="submit">
                        Log In
                    </Button>
                    <Typography variant="body2">
                        {"Don't have an account? "}
                        <Link component={RouterLink} to="/signup">
                            Sign up
                        </Link>
                    </Typography>
                </Box>
            </form>
        </Container>
    );
};
