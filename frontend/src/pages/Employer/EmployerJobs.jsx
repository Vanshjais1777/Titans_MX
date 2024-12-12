import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EmployerSidebar from '../../components/EmployerSidebar';
import GovtSidebar from '../../components/GovtSidebar'; // Assuming you have this component
import EmployeeSidebar from '../../components/EmployeeSidebar'; // Assuming you have this component
import { useAuth } from '../../context/AuthContext'; // Import useAuth hook

const EmployerJobs = () => {
    const [jobs, setJobs] = useState([]); // State to store job data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [searchTerm, setSearchTerm] = useState(''); // Search term
    const [sortOrder, setSortOrder] = useState('default'); // Sort order

    const { token, role } = useAuth(); // Destructure token and role from the context

    const navigate = useNavigate(); // Hook to navigate programmatically

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/job/read-jobs`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setJobs(response.data.jobs); // Store jobs data in state
                setLoading(false); // Set loading to false
            } catch (err) {
                console.error('Error fetching jobs:', err);
                setError('Failed to fetch jobs.');
                setLoading(false); // Set loading to false even on error
            }
        };

        if (token) {
            fetchJobs();
        } else {
            setLoading(false);
            setError('User not authenticated');
        }
    }, [token]); // Run once when the component mounts

    const handleDeleteJob = async (jobId) => {
        if (!window.confirm('Are you sure you want to delete this job?')) return;

        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/job/delete-job`,
                { jobId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setJobs(jobs.filter((job) => job._id !== jobId)); // Remove deleted job from state
            alert('Job deleted successfully.');
        } catch (err) {
            console.error('Error deleting job:', err);
            alert('Failed to delete job.');
        }
    };

    const filteredJobs = jobs
        .filter((job) => job.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortOrder === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
            if (sortOrder === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
            return 0;
        });

    // Render sidebar based on role from useAuth context
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
        <div className="flex bg-gray-100 h-screen">
            {renderSidebar()} {/* Render the sidebar based on the role */}
            <div className="flex p-2 flex-col w-full h-screen bg-gray-50 overflow-y-auto">
                <header className="p-6 bg-white shadow-md">
                    <h1 className="text-2xl font-bold">Manage Jobs</h1>
                    <p className="text-sm text-gray-500">Employer / Dashboard / My Jobs</p>
                </header>

                <div className="p-6 bg-white shadow-md mt-4 mx-6 rounded-lg flex items-center justify-between">
                    <input
                        type="text"
                        placeholder="Job title, Keywords etc."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 flex-1 mr-4"
                    />
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => setSearchTerm('')} // Clear search
                    >
                        Clear
                    </button>
                    <select
                        className="border border-gray-300 rounded-lg p-2 ml-4"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="default">Sort by (Default)</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>

                <div className="p-6 mx-6 mt-4 bg-white shadow-md rounded-lg">
                    {loading ? (
                        <p>Loading jobs...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : filteredJobs.length > 0 ? (
                        filteredJobs.map((job) => (
                            <JobCard
                                key={job._id}
                                job={job}
                                onDelete={handleDeleteJob}
                            />
                        ))
                    ) : (
                        <p>No jobs found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const JobCard = ({ job, onDelete }) => {
    const navigate = useNavigate(); // Hook to navigate programmatically
    const statusColor = job.status === 'Active' ? 'bg-green-500' : 'bg-red-500';

    const handleCardClick = () => {
        navigate(`/employee/single-job/${job._id}`); // Redirect to job details page
    };

    return (
        <div
            className="flex items-center justify-between p-4 mb-4 bg-white border rounded-lg shadow-sm cursor-pointer"
            onClick={handleCardClick}
        >
            <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                    {/* <img
                        src={`/logos/${job.employer?.name?.toLowerCase().replace(/\s+/g, '-')}.png`}
                        alt={job.employer?.name || 'Unknown Company'}
                        className="w-10 h-10"
                    /> */}
                </div>
                <div>
                    <h3 className="font-bold text-lg">{job.title}</h3>
                    <p className="text-gray-500">{job.employer?.name || 'Unknown Company'}</p>
                </div>
            </div>

            <div className="text-center">
                <span className="px-4 py-2 rounded-lg text-white font-medium bg-blue-500">
                    {job.applicantsCount} Applicants
                </span>
            </div>

            <div>
                <p className="text-sm text-gray-500">Posted: {new Date(job.createdAt).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">
                    Expired: {job.endDate ? new Date(job.endDate).toLocaleDateString() : 'N/A'}
                </p>
            </div>

            <div className="flex space-x-2">
                <button
                    className="bg-red-500 text-white px-3 py-2 rounded-lg"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling
                        onDelete(job._id);
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default EmployerJobs;
