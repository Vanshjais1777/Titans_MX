import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import EmployerSidebar from '../../components/EmployerSidebar';
import { useAuth } from "../../context/AuthContext";  // Assuming useAuth is the context hook for authentication
import GovtSidebar from "../../components/GovtSidebar"; // Assuming GovtSidebar exists
import EmployeeSidebar from "../../components/EmployeeSidebar"; // Assuming EmployeeSidebar exists


const EmployerInternships = () => {
    const [internships, setInternships] = useState([]); // State to store internships
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const token = localStorage.getItem('token'); // Get token from local storage

    const { role } = useAuth() // Access role from context

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

    useEffect(() => {
        const fetchInternships = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/job/read-jobs?jobType=internship`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setInternships(response.data.jobs); // Store internships in state
                setLoading(false); // Set loading to false
            } catch (err) {
                console.error('Error fetching internships:', err);
                setError('Failed to fetch internships.');
                setLoading(false); // Set loading to false even on error
            }
        };

        fetchInternships();
    }, [token]); // Run once when the component mounts

    const handleDeleteInternship = async (jobId) => {
        if (!window.confirm('Are you sure you want to delete this internship?')) return;

        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/job/delete-job`,
                { jobId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setInternships(internships.filter((internship) => internship._id !== jobId)); // Remove deleted internship from state
            alert('Internship deleted successfully.');
        } catch (err) {
            console.error('Error deleting internship:', err);
            alert('Failed to delete internship.');
        }
    };

    return (
        <div className="flex bg-gray-100 h-screen">
            {renderSidebar()} {/* Render sidebar based on the role */}
            <div className="flex p-2 flex-col w-full h-screen bg-gray-50 overflow-y-auto">
                {/* Header Section */}
                <header className="p-6 bg-white shadow-md">
                    <h1 className="text-2xl font-bold">Manage Internships</h1>
                    <p className="text-sm text-gray-500">Employer / Dashboard / My Internships</p>
                </header>

                {/* Search and Filters Section */}
                <div className="p-6 bg-white shadow-md mt-4 mx-6 rounded-lg flex items-center justify-between">
                    <input
                        type="text"
                        placeholder="Internship title, Keywords etc."
                        className="border border-gray-300 rounded-lg p-2 flex-1 mr-4"
                    />
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Search</button>
                    <select className="border border-gray-300 rounded-lg p-2 ml-4">
                        <option>Sort by (Default)</option>
                        <option>Newest</option>
                        <option>Oldest</option>
                    </select>
                </div>

                {/* Internship Cards Section */}
                <div className="p-6 mx-6 mt-4 bg-white shadow-md rounded-lg">
                    {loading ? (
                        <p>Loading internships...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : internships.length > 0 ? (
                        internships.map((internship) => (
                            <InternshipCard
                                key={internship._id}
                                internship={internship}
                                onDelete={handleDeleteInternship}
                            />
                        ))
                    ) : (
                        <p>No internships found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const InternshipCard = ({ internship, onDelete }) => {
    const statusColor = internship.status === 'Active' ? 'bg-green-500' : 'bg-red-500';

    return (
        <div className="flex items-center justify-between p-4 mb-4 bg-white border rounded-lg shadow-sm">
            <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                    <img
                        src={`/logos/${internship.employer?.name?.toLowerCase().replace(/\s+/g, '-')}.png`}
                        alt={internship.employer?.name || 'Unknown Company'}
                        className="w-10 h-10"
                    />
                </div>
                <div>
                    <h3 className="font-bold text-lg">{internship.title}</h3>
                    <p className="text-gray-500">{internship.employer?.name || 'Unknown Company'}</p>
                </div>
            </div>

            <div className="text-center">
                <span className="px-4 py-2 rounded-lg text-white font-medium bg-blue-500">
                    {internship.applicantsCount} Applicants
                </span>
            </div>

            <div>
                <p className="text-sm text-gray-500">Posted: {new Date(internship.createdAt).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">
                    Expired: {internship.endDate ? new Date(internship.endDate).toLocaleDateString() : 'N/A'}
                </p>
            </div>

            <div className="flex space-x-2">
                <button className="bg-red-500 text-white px-3 py-2 rounded-lg" onClick={() => onDelete(internship._id)}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default EmployerInternships;
