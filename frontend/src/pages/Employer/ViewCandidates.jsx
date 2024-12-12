import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import EmployerSidebar from "../../components/EmployerSidebar";
import GovtSidebar from '../../components/GovtSidebar'; // Assuming you have this component
import EmployeeSidebar from '../../components/EmployeeSidebar'; // Assuming you have this component
import { useAuth } from "../../context/AuthContext"; // Import userAuth context

const EmployeeListPage = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandedProfiles, setExpandedProfiles] = useState({}); // Tracks which profiles are expanded

    // Fetch all employees
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/profile/employee/get-allemployee`
                );
                setEmployees(response.data.employee); // Adjust according to your backend structure
                console.log(response.data.employee); // Adjust according to your backend structure
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch employees. Please try again.");
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    // Toggle profile view
    const toggleProfileView = (userId) => {
        setExpandedProfiles((prevState) => ({
            ...prevState,
            [userId]: !prevState[userId],
        }));
    };

    // Access role from the userAuth context
    const { role } = useAuth();

    // Function to render sidebar based on role
    const renderSidebar = () => {
        if (!role) {
            return <div>Error: User role not found</div>; // Handle unexpected cases
        }

        switch (role.toLowerCase()) { // Ensure case-insensitive matching
            case "govt":
                return <GovtSidebar />;
            case "employee":
                return <EmployeeSidebar />;
            case "employer":
                return <EmployerSidebar />;
            default:
                return <div>Role not recognized</div>; // Handle unknown roles explicitly
        }
    };

    return (
        <div className="flex h-screen">
            <div>{renderSidebar()}</div> {/* Render the sidebar based on role */}
            <div className="min-h-screen bg-gray-100 p-6 overflow-y-auto w-screen">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        Logged-in Candidates
                    </h1>

                    {/* Loading state */}
                    {loading && (
                        <div className="text-center mt-6">
                            <div className="text-gray-600">Loading employees...</div>
                        </div>
                    )}

                    {/* Error state */}
                    {error && (
                        <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    {/* Employee List */}
                    {!loading && !error && employees.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {employees.map((employee) => (
                                <div
                                    key={employee.userId._id}
                                    className="bg-white shadow-md rounded-lg p-4"
                                >
                                    <h2 className="text-lg font-semibold text-gray-700">
                                        {employee.userId.firstName} {employee.userId.lastName}
                                    </h2>
                                    <p className="text-gray-500">{employee.email}</p>
                                    <p className="text-sm text-gray-400">
                                        Logged in at:{" "}
                                        {new Date(employee.createdAt).toLocaleString()}
                                    </p>

                                    {/* View Profile Button */}
                                    <button
                                        className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                        onClick={() => toggleProfileView(employee.userId)}
                                    >
                                        {expandedProfiles[employee.userId]
                                            ? "Hide Profile"
                                            : "View Profile"}
                                    </button>

                                    {/* Expanded Profile Details */}
                                    {expandedProfiles[employee.userId] && (
                                        <div className="mt-4 text-sm text-gray-700 space-y-2">
                                            <p><strong>Phone:</strong> {employee.phone || "N/A"}</p>
                                            <p><strong>Location:</strong>
                                                {employee.location ? (() => {
                                                    try {
                                                        const location = JSON.parse(employee.location);
                                                        return (
                                                            <>
                                                                <span> {location.addressLine1}, {location.addressLine2}</span>
                                                                <br />
                                                                <span>{location.city}, {location.state}, {location.country}</span>
                                                                <br />
                                                                <span>Postal Code: {location.postalCode}</span>
                                                            </>
                                                        );
                                                    } catch (err) {
                                                        return "Invalid Location Data";
                                                    }
                                                })() : "N/A"}</p>
                                            <p><strong>Bio:</strong> {employee.bio || "N/A"}</p>
                                            <p><strong>Skills:</strong> {employee.skills.join(", ") || "N/A"}</p>
                                            <p><strong>Portfolio Link:</strong>{" "}
                                                {employee.portfolioLink || "N/A"}
                                            </p>
                                            <p><strong>Languages:</strong>{" "}
                                                {employee.languages.join(", ") || "N/A"}
                                            </p>
                                            <p><strong>Experience:</strong>{" "}
                                                {employee.experienceDetails.join(", ") || "N/A"}
                                            </p>
                                            <p><strong>Education:</strong>{" "}
                                                {employee.education.join(", ") || "N/A"}
                                            </p>
                                        </div>
                                    )}

                                </div>
                            ))}
                        </div>
                    ) : !loading && !error && employees.length === 0 ? (
                        <div className="text-center text-gray-500 mt-6">
                            No employees are currently logged in.
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default EmployeeListPage;
