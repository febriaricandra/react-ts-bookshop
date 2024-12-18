import axios from "axios";

const Api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

Api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const { status } = error.response;
            switch (status) {
                case 401:
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                    break;
                default:
                    break;
            }
        } else {
            console.log(error);
        }
        return Promise.reject(error);
    }
);


export default Api;