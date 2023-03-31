import Login from "../pages/login";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";

import useAuth from "./hooks/useAuth";

function App() {
    const { login, logout, isAuthenticated } = useAuth();

    return (
        <Box>
            {isAuthenticated() && (
                <Button onClick={() => logout()}>Logout</Button>
            )}
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        isAuthenticated() ? (
                            <h1>Welcome, you are logged in!</h1>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/login"
                    element={
                        isAuthenticated() ? (
                            <Navigate to="/" />
                        ) : (
                            <Login onLogin={login} />
                        )
                    }
                />
            </Routes>
        </Box>
    );
}

export default App;
