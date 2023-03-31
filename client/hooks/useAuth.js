import { useState } from "react";

const useAuth = () => {
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("accessToken" || "")
    );

    const login = (accessToken) => {
        localStorage.setItem("accessToken", accessToken);
        setAccessToken(accessToken);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAccessToken("");
    };

    const isAuthenticated = () => !!accessToken;

    return { accessToken, login, logout, isAuthenticated };
};

export default useAuth;
