import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContextType, decodedType, User } from "./types";
import { jwtDecode } from "jwt-decode";
import { TOKEN_KEY } from "../utils/constants";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8000";
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            const decoded: decodedType = jwtDecode(token);
            if (decoded) {
                const currentTimeInSeconds = Math.floor(Date.now() / 1000);
                if (decoded.exp < currentTimeInSeconds) {
                    localStorage.removeItem(TOKEN_KEY);
                    setUser(null);
                } else {
                    setUser({ email: decoded.email, lastName: decoded.lastName, firstName: decoded.firstName });
                }
            }
        }
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/auth/signin`, { email, password });
            const { token } = response.data;

            if (token) {
                localStorage.setItem(TOKEN_KEY, token);
            }
            const decoded: User = jwtDecode(token);
            setUser({ email: decoded.email, firstName: decoded.firstName, lastName: decoded.lastName });
        } catch (error) {
            throw error;
        }
    };

    const signUp = async (firstName: string, lastName: string, email: string, password: string): Promise<void> => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/auth/signup`, {
                firstName,
                lastName,
                email,
                password
            });

            const { token } = response.data;
            localStorage.setItem(TOKEN_KEY, JSON.stringify(token));

            const decoded: any = jwtDecode(token);
            setUser({ firstName: decoded.firstName, lastName: decoded.lastName, email: decoded.email });
        } catch (error) {
            throw error;
        }
    };

    const signOut = () => {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
    };

    const value = {
        user,
        isAuthenticated: !!user?.email,
        signIn,
        signUp,
        setUser,
        signOut
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
