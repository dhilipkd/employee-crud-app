import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000,
});


// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
    async (config) => {

        // TOKEN
        const token =
            localStorage.getItem("token");
        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {

        // UNAUTHORIZED
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }

        // SERVER ERROR
        if (error.response?.status === 500) {
            console.error(
                "Internal Server Error"
            );
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;