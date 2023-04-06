import Login from "./pages/login";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import useAuth from "./hooks/useAuth";
import Home from "./pages/home";
import {
    disconnectSocket,
    emit,
    initiateSocketConnection,
    on,
} from "./services/socketio.service";
import ThankYou from "./pages/thanhyou";

function App() {
    const { login, logout, isAuthenticated, isLoading, error, spin, store } =
        useAuth();
    const [customer, setCustomer] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (!spin && isAuthenticated) {
            initiateSocketConnection();

            emit("joinRoom", store);

            on("newRating", (data) => {
                if (data) setCustomer(data);
            });
            on("customerRated", () => {
                setCustomer({});
                navigate("/thankyou");
            });

            return () => {
                disconnectSocket();
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, spin]);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Home
                        isLoading={spin}
                        isAuthenticated={isAuthenticated}
                        store={store}
                        customer={customer}
                        onLogout={logout}
                    />
                }
            />
            <Route
                path="/login"
                element={
                    isAuthenticated ? (
                        <Navigate to="/" />
                    ) : (
                        <Login
                            onLogin={login}
                            isLoading={isLoading}
                            error={error}
                        />
                    )
                }
            />
            <Route
                path="/thankyou"
                element={<ThankYou />}
            />
        </Routes>
    );
}

export default App;
