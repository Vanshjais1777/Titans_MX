import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaUserCircle,
  FaUser,
  FaFileAlt,
  FaLock,
  FaTrashAlt,
  FaHome,
} from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const EmployeeSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const { logout } = useAuth();
  const [employeeFirstName, setEmployeeFirstName] = useState("");
  const [employeeLastName, setEmployeeLastName] = useState("");

  // Fetch employee data from backend
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/profile/employee/get-employee`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEmployeeFirstName(response.data.data.userId.firstName);
        setEmployeeLastName(response.data.data.userId.lastName);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  // Navigation Links Data
  const links = [
    { label: "My Profile", icon: FaUserCircle, path: "/employee/profile" },
    { label: "My Resumes", icon: FaFileAlt, path: "/employee/resume" },
    { label: "Applied Jobs", icon: FaFileAlt, path: "/employee/appliedjobs" },
    { label: "Applied Internships", icon: FaFileAlt, path: "/employee/appliedinternships" },
    { label: "Change Password", icon: FaLock, path: "/user/reset-pass" },
    { label: "Home", icon: FaHome, path: "/" },
    { label: "Log out", icon: FaTrashAlt, path: "/" },
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
    <div className="fixed top-0 left-0 w-72 h-screen bg-white shadow-lg overflow-y-auto flex flex-col">
      {/* Profile Section */}
      <div className="flex flex-col items-center py-6 border-b border-gray-200">
        <h2 className="mt-3 text-xl font-semibold text-gray-800">
          {employeeFirstName} {employeeLastName}
        </h2>
      </div>

      {/* Navigation Section */}
      <nav className="mt-4">
        <ul>
          {links.map((link, index) => (
            <li
              key={index}
              className={`flex items-center px-6 py-3 cursor-pointer rounded-lg transition-colors
              ${location.pathname === link.path
                  ? "bg-green-100 text-green-600 font-semibold"
                  : "hover:bg-green-50 text-gray-800"
                }`}
              onClick={() => handleNavigation(link.label, link.path)} // Pass both label and path
            >
              <link.icon
                className={`text-lg mr-4 ${location.pathname === link.path
                  ? "text-green-600"
                  : "text-gray-600"
                  }`}
              />
              <span className="text-sm">{link.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default EmployeeSidebar;
