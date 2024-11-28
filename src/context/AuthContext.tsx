import { createContext, ReactNode, useContext, useState } from "react";
import Api from "../utils/Api";
import useLocalstorage from "../hooks/useLocalstorage";

type AuthContextType = {
    user: { access: string, refresh: string } | null;
    login: (email: string, password: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<{ access: string, refresh: string } | null>(null);

    const login = async (email: string, password: string) => {
        // Call API to login
        try {
            const response = await Api.post("/login", { email, password });
            console.log(response);
            localStorage.setItem("token", response.data.access_token);
            //cookie for refresh token
            document.cookie = `refresh=${response.data.refresh_token}; path=/; secure; httpOnly; samesite=strict`;
        }
        catch (error) {
            console.error("Failed to login", error);
        }
    };

    const logout = () => {
        // Call API to logout
        // Remove user from localStorage
        useLocalstorage("token", "");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};