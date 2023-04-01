import axios from "axios";
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const useAuth = () => {
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("accessToken") || ""
    );
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const axiosInstance = axios.create({
        baseURL: API_URL,
    });

    const login = async (username, password) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post("/auth/login", {
                username,
                password,
            });
            setAccessToken(response.data.token);
            localStorage.setItem("accessToken", response.data.token);
            setError(null);
        } catch (error) {
            setError(error.response.data);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAccessToken(null);
    };

    const isAuthenticated = () => {
        return !!accessToken;
    };

    return {
        accessToken,
        error,
        login,
        logout,
        isAuthenticated,
        isLoading,
    };
};

export default useAuth;
