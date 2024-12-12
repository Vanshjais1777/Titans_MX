import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployerSidebar from "../../components/EmployerSidebar";
import EmployeeSidebar from "../../components/EmployeeSidebar";
import GovtSidebar from "../../components/GovtSidebar";
import { useAuth } from "../../context/AuthContext";

const EmployerListPage = () => {
    const [employers, setEmployers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expandedProfiles, setExpandedProfiles] = useState({});
    const { role } = useAuth(); // Get user data from context

    // Fetch all employers
    useEffect(() => {
        const fetchEmployers = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/profile/employer/get-allemployer`
                );
                setEmployers(response.data.employer); // Adjust according to your backend structure
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch employers. Please try again.");
                setLoading(false);
            }
        };

        fetchEmployers();
    }, []);

    // Toggle profile view
    const toggleProfileView = (userId) => {
        setExpandedProfiles((prevState) => ({
            ...prevState,
            [userId]: !prevState[userId],
        }));
    };

    // Verify Employer
    const handleVerify = async (userId) => {
        try {
            // Call backend to verify the employer
            const response = await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}/api/profile/employer/verify/${userId}`,
                {},
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            if (response.status === 200) {
                // Update local state to disable the "Verify" button
                setEmployers((prevEmployers) =>
                    prevEmployers.map((employer) =>
                        employer.userId === userId
                            ? { ...employer, verified: true }
                            : employer
                    )
                );
            } else {
                setError("Failed to verify the employer. Please try again.");
            }
        } catch (err) {
            setError("An error occurred while verifying the employer.");
        }
    };

    // Sidebar logic: render based on the role from context
    const renderSidebar = () => {
        if (!role) {
            return <div>Error: User role not found</div>; // Handle unexpected cases
        }

        switch (role.toLowerCase()) {
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
            {renderSidebar()} {/* Render sidebar based on role */}
            <div className="min-h-screen bg-gray-100 p-6 overflow-y-auto w-screen">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        Logged-in Companies
                    </h1>

                    {/* Loading state */}
                    {loading && (
                        <div className="text-center mt-6">
                            <div className="text-gray-600">Loading employers...</div>
                        </div>
                    )}

                    {/* Error state */}
                    {error && (
                        <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    {/* Employer List */}
                    {!loading && !error && employers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {employers.map((employer) => (
                                <div
                                    key={employer.userId}
                                    className="bg-white shadow-md rounded-lg p-4"
                                >
                                    <h2 className="text-lg font-semibold text-gray-700">
                                        {employer.companyName || "No Name Provided"}
                                    </h2>
                                    <p className="text-gray-500">{employer.email}</p>
                                    <p className="text-sm text-gray-400">
                                        Logged in at:{" "}
                                        {new Date(employer.createdAt).toLocaleString()}
                                    </p>

                                    {/* View Profile Button */}
                                    <button
                                        className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                        onClick={() => toggleProfileView(employer.userId)}
                                    >
                                        {expandedProfiles[employer.userId]
                                            ? "Hide Profile"
                                            : "View Profile"}
                                    </button>

                                    {/* Expanded Profile Details */}
                                    {expandedProfiles[employer.userId] && (
                                        <div className="mt-4 text-sm text-gray-700 space-y-2">
                                            <p><strong>Company Name:</strong> {employer.companyName || "N/A"}</p>
                                            <p><strong>Location:</strong>
                                                {employer.location ? (() => {
                                                    try {
                                                        const location = JSON.parse(employer.location);
                                                        return (
                                                            <>
                                                                <span>{location.addressLine1}, {location.addressLine2}</span>
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
                                            <p><strong>Phone:</strong> {employer.phone || "N/A"}</p>
                                            <p><strong>Website:</strong> {employer.website || "N/A"}</p>
                                            <p><strong>Industry:</strong> {employer.industry || "N/A"}</p>
                                            <p><strong>Bio:</strong> {employer.bio || "N/A"}</p>
                                        </div>
                                    )}

                                    {/* Verify Button */}
                                    {!employer.verified && (
                                        <button
                                            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            onClick={() => handleVerify(employer.userId)}
                                        >
                                            Verify
                                        </button>
                                    )}
                                    {employer.verified && (
                                        <button
                                            className="mt-3 px-4 py-2 bg-gray-400 text-white rounded"
                                            disabled
                                        >
                                            Verified
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : !loading && !error && employers.length === 0 ? (
                        <div className="text-center text-gray-500 mt-6">
                            No employers are currently logged in.
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default EmployerListPage;
