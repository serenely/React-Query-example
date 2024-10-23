export interface User {
    id?: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface decodedType extends User {
    iat: number;
    exp: number;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    signUp: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    signOut: () => void;
}
