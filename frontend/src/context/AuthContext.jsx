import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            try {
                const decodedToken = jwtDecode(storedToken);

                if (decodedToken.exp * 1000 > Date.now()) {
                    setIsLoggedIn(true);
                    setToken(storedToken);
                    setRole(decodedToken.role || "unknown"); // Handle missing role gracefully
                } else {
                    logout(); // Token expired
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                logout(); // Invalid token
            }
        }
    }, []);

    const login = (jwtToken) => {
        try {
            const decodedToken = jwtDecode(jwtToken);
            setIsLoggedIn(true);
            setToken(jwtToken);
            setRole(decodedToken.role || "unknown"); // Handle missing role

            localStorage.setItem("token", jwtToken);
            localStorage.setItem("role", decodedToken.role || "unknown");
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const logout = () => {
        localStorage.clear(); // Clear all localStorage keys
        setIsLoggedIn(false);
        setRole(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                token,
                role,
                login,
                logout,
                setIsLoggedIn,
                setRole: (newRole) => {
                    setRole(newRole);
                    localStorage.setItem("role", newRole); // Update localStorage
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
