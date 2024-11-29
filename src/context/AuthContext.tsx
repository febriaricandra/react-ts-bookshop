import { createContext, ReactNode, useContext, useState } from "react";
import Api from "../utils/Api";

interface User {
    email: string;
    name: string;
    isAdmin: boolean;
}

type AuthContextType = {
    user: { email: string, name: string, isAdmin: boolean, } | null;
    login: (email: string, name: string) => Promise<any>;
    logout: () => void;
    profile: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<{ email: string, name: string, isAdmin: boolean } | null>(null);

    const login = async (email: string, password: string): Promise<User> => {
        try {
            const response = await Api.post("/login", { email, password });
            localStorage.setItem("token", response.data.access_token);
            const user = await profile();
            return user;
        }
        catch (error) {
            console.error("Failed to login", error);
            throw new Error("Failed to login");
        }
    };

    const profile = async () => {
        try {
            const response = await Api.get("/profile");
            localStorage.setItem("user", JSON.stringify(response.data.user));
            setUser(response.data.user);
            return response.data.user;
        }
        catch (error) {
            throw new Error("Failed to get profile");
            // console.error("Failed to get profile", error);
        }
    }

    const logout = () => {
        // Call API to logout
        // Remove user from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, profile }}>
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