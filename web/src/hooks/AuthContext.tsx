import React, { createContext, useCallback, useState, useContext } from "react";
import api from "../services/api";

interface SignInCredentials {
    email: string;
    password: string;
}
interface AuthContextProps {
    user: object;
    signIn(credentials: SignInCredentials): Promise<void>;
}

interface AuthState {
    token: string;
    user: object;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem("@Ipet:token");
        const user = localStorage.getItem("@Ipet:user");

        if (token && user) {
            return { token, user: JSON.parse(user) };
        }

        return {} as AuthState;
    });

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post("sessions", {
            email,
            password,
        });

        const { token, user } = response.data;

        localStorage.setItem("@Ipet:token", token);
        localStorage.setItem("@Ipet:user", JSON.stringify(user));

        setData({ token, user });
    }, []);

    return (
        <AuthContext.Provider value={{ user: data.user, signIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextProps {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
