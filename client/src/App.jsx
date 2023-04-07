import Login from "./pages/login";
import { Routes, Route, Navigate } from "react-router-dom";

import useAuth from "./hooks/useAuth";
import Home from "./pages/home";
import ThankYou from "./pages/thanhyou";

function App() {
    const { login, logout, isAuthenticated, isLoading, error, spin, store } =
        useAuth();
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Home
                        isLoading={spin}
                        isAuthenticated={isAuthenticated}
                        store={store}
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
            <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
    );
}

export default App;
