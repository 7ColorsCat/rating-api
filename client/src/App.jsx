import Login from "./pages/login";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import useAuth from "./hooks/useAuth";
import Home from "./pages/home";
import {
    disconnectSocket,
    emit,
    initiateSocketConnection,
    on,
} from "./services/socketio.service";

function App() {
    const { login, logout, isAuthenticated, isLoading, error, spin, store } =
        useAuth();

    useEffect(() => {
        if (!spin && isAuthenticated) {
            initiateSocketConnection();

            emit("joinRoom", store);

            on("newRating", (data) => {
                console.log(data);
            });

            return () => {
                disconnectSocket();
            };
        }
    }, [isAuthenticated, spin, store]);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Home isLoading={spin} isAuthenticated={isAuthenticated} />
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
        </Routes>
    );
}

export default App;
