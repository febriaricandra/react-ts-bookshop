import Api from "../utils/Api";
import useLocalstorage from "../hooks/useLocalstorage";

import { User } from "../@types/users";


type UserDetailResponse = {
    data: User;
    status: boolean;
};

type Data = {
    email: string;
    password: string;
}

class AuthServices {
    static async login(data: Data): Promise<UserDetailResponse> {
        try {
            const response = await Api.post<UserDetailResponse>("/login", data);
            // useLocalstorage("token", response.data.data.access);
            console.log(response);
            // document.cookie = `refresh=${response.data.data.refresh}; path=/; secure; httpOnly; samesite=strict`;
            return response.data;
        } catch (error) {
            console.error("Failed to login")
            throw new Error("Failed to login")
        }
    }

    static async register(name: string, email: string, password: string): Promise<UserDetailResponse> {
        try {
            const response = await Api.post<UserDetailResponse>("/register", { name, email, password });
            return response.data;
        } catch (error) {
            console.error("Failed to register")
            throw new Error("Failed to register")
        }
    }
}

export default AuthServices;