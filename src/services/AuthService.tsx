import Api from "../utils/Api";
import { User } from "../@types/users";


type UserDetailResponse = {
    data: User;
    status: boolean;
};

type Data = {
    email: string;
    password: string;
}

type RegisterData = {
    name: string;
    email: string;
    password: string;
}

class AuthServices {
    static async login(data: Data): Promise<UserDetailResponse> {
        try {
            const response = await Api.post<UserDetailResponse>("/login", data);
            return response.data;
        } catch (error) {
            console.error("Failed to login")
            throw new Error("Failed to login")
        }
    }

    static async register(data: RegisterData): Promise<UserDetailResponse> {
        try {
            const response = await Api.post<UserDetailResponse>("/register", data);
            return response.data;
        } catch (error) {
            console.error("Failed to register")
            throw new Error("Failed to register")
        }
    }

    static async profile(): Promise<UserDetailResponse> {
        try {
            const response = await Api.get<UserDetailResponse>("/profile");
            return response.data;
        } catch (error) {
            // console.error("Failed to fetch profile")
            throw new Error("Failed to fetch profile")
        }
    }
}

export default AuthServices;