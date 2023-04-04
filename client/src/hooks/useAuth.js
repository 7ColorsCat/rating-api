import axios from "axios";
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const useAuth = () => {
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("scc-access-token") || ""
    );
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);
    const [spin, setSpin] = useState(true);

    const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const login = async (username, password) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post("/auth/login", {
                username,
                password,
            });
            setAccessToken(response.data.token);
            localStorage.setItem("scc-access-token", response.data.token);
            localStorage.setItem("scc-store", response.data.store);
            setIsAuthenticated(true);
            setError(null);
        } catch (error) {
            setError(error.response.data);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("scc-access-token");
        setAccessToken(null);
    };

    const verifyToken = async () => {
        try {
            const response = await axiosInstance.get("/auth/verify-token");
            if (response.data.ok) setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
        } finally {
            setSpin(false);
        }
    };

    useEffect(() => {
        verifyToken();
    }, []);

    return {
        error,
        login,
        logout,
        isAuthenticated,
        isLoading,
        spin,
    };
};

export default useAuth;
