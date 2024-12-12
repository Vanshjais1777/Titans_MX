import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
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
    FaTrain,
    FaLock,
    FaBell
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook

const EmployerSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth(); // Get logout function from AuthContext

    const [companyName, setCompanyName] = useState(""); // State to store company name

    // Fetch company name from the backend
    useEffect(() => {
        const fetchCompanyName = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/profile/employer/get-employer", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setCompanyName(response.data.data.companyName); // Set the fetched company name
            } catch (error) {
                console.error("Error fetching company data:", error);
            }
        };

        fetchCompanyName(); // Call the function to fetch the company name
    }, []);

    // Menu items array
    const menuItems = [
        { path: "/govt/profile", icon: FaUser, label: "Govt Profile" },
        { path: "/govt/postjobs", icon: FaPaintBrush, label: "Post Jobs" },
        { path: "/govt/posttrainings", icon: FaGraduationCap, label: "Post Trainings" },
        { path: "/govt/jobs", icon: FaBriefcase, label: "All Jobs" },
        { path: "/govt/internships", icon: FaBox, label: "All Internships" },
        { path: "/govt/trainings", icon: FaGraduationCap, label: "All Trainings" },
        { path: "/govt/certifications", icon: FaCertificate, label: "All Certifications" },
        { path: "/govt/all-candidates", icon: FaUsers, label: "All Candidates" },
        { path: "/govt/all-companies", icon: FaTrain, label: "All Companies" },
        { path: "/all-mentors", icon: FaBell, label: "All mentors" },
        { path: "/private-requests", icon: FaLock, label: "Private Requests" }, // Added Private Requests
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
                    {companyName || "Loading..."} {/* Display company name or loading text */}
                </h2>
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
