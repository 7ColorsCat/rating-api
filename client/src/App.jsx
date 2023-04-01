import Login from "./pages/login";
import { Routes, Route, Navigate } from "react-router-dom";

import useAuth from "./hooks/useAuth";
import Home from "./pages/home";

function App() {
    const { login, logout, isAuthenticated, isLoading, error, spin } =
        useAuth();

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
