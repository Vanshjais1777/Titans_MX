import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    FaUser,
    FaBriefcase,
    FaPaintBrush,
    FaUsers,
    FaUserCircle,
    FaBox,
    FaGraduationCap,
    FaCertificate,
    FaTrashAlt,
    FaHome,
    FaTrain
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
import axios from "axios";

const EmployerSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth(); // Get logout function from AuthContext
    const [employerFirstName, setEmployerFirstName] = useState("");
    const [employerLastName, setEmployerLastName] = useState("");

    // Fetch employer data from backend
    useEffect(() => {
        const fetchEmployerData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/profile/employer/get-employer`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                console.log(response.data);
                setEmployerFirstName(response.data.data.userId.firstName);
                setEmployerLastName(response.data.data.userId.lastName);
            } catch (error) {
                console.error("Error fetching employer data:", error);
            }
        };

        fetchEmployerData();
    }, []);

    // Menu items array
    const menuItems = [
        { path: "/employer/profile", icon: FaUser, label: "User Profile" },
        { path: "/employer/jobs", icon: FaBriefcase, label: "My Jobs" },
        { path: "/employer/postjobs", icon: FaPaintBrush, label: "Submit Jobs" },
        { path: "/employer/posttrainings", icon: FaGraduationCap, label: "Submit Trainings" },
        { path: "/employer/internships", icon: FaBox, label: "My Internships" },
        { path: "/employer/trainings", icon: FaGraduationCap, label: "My Trainings" },
        { path: "/employer/certifications", icon: FaCertificate, label: "My Certifications" },
        { path: "/", icon: FaHome, label: "Home" }, // Home path
        { path: "logout", icon: FaTrashAlt, label: "Log out" }, // Custom path for logout logic
    ];

    // Handle Navigation
    const handleNavigation = async (label, path) => {
        if (label === "Log out") {
            try {
                await logout(); // Call the logout function from AuthContext
                navigate("/"); // Navigate to the home page after logout
            } catch (error) {
                console.error("Logout failed:", error);
            }
        } else {
            navigate(path); // Navigate to the specified path for other links
        }
    };

    return (
        <div
            className="w-72 h-screen bg-white shadow-lg overflow-y-auto flex flex-col"
            role="navigation"
            aria-label="Employer Sidebar"
        >
            {/* Profile Section */}
            <div className="flex flex-col items-center py-8 border-b border-gray-200">
                <img
                    src="https://via.placeholder.com/80" // Replace with actual image URL
                    alt="Logo"
                    className="w-20 h-20 rounded-full object-cover"
                />
                <h2 className="mt-4 text-lg font-semibold text-gray-800">
                    {employerFirstName} {employerLastName}
                </h2>
                <p className="text-sm text-gray-500">Employer Dashboard</p>
            </div>

            {/* Navigation Menu */}
            <div className="mt-4">
                <h3 className="px-6 text-sm text-gray-500 uppercase">
                    Main Navigation
                </h3>
                <ul className="mt-2 space-y-1">
                    {menuItems.map(({ path, icon: Icon, label }) => (
                        <li
                            key={label}
                            className={`flex items-center px-6 py-3 cursor-pointer rounded-lg transition-colors
                                ${location.pathname === path
                                    ? "bg-green-50 text-green-600 font-semibold"
                                    : "text-gray-800 hover:bg-green-50"
                                }`}
                            onClick={() => handleNavigation(label, path)}
                        >
                            <Icon className="text-lg mr-4" />
                            <span>{label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EmployerSidebar;
