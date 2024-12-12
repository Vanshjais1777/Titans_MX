import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";  // Assuming useAuth is the context hook for authentication
import EmployerSidebar from "../../components/EmployerSidebar";
import EmployeeSidebar from "../../components/EmployeeSidebar";
import GovtSidebar from "../../components/GovtSidebar";

const EmployerDashboard = () => {
    const { role } = useAuth();  // Get the role from the useAuth hook
    const navigate = useNavigate();

    const renderSidebar = () => {
        if (role === "govt") {
            return <GovtSidebar />;
        } else if (role === "employee") {
            return <EmployeeSidebar />;
        } else if (role === "employer") {
            return <EmployerSidebar />;
        }
        return null;  // Default case if role is not recognized
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Conditional Sidebar */}
            {renderSidebar()}

            {/* Main Content */}
            <div className="flex-1 h-screen overflow-y-auto bg-gray-50 p-6">
                <header className="mb-6 flex">
                    <div>
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <p className="text-sm text-gray-500">Dashboard / Employer Statistics</p>
                    </div>
                    <div>
                        <button
                            onClick={() => navigate('/')}
                            className="absolute right-4 bg-blue-500 text-black px-4 py-2 rounded-lg shadow-md hover:bg-blue-400 flex items-center transition mr-5"
                        >
                            <FaHome className="mr-3" />
                            Home
                        </button>
                    </div>
                </header>
                <div className="grid grid-cols-4 gap-6 mb-6">
                    <div className="bg-white shadow-md rounded-lg p-4 text-center">
                        <h2 className="text-2xl font-bold">120</h2>
                        <p className="text-sm text-gray-500">Posted Jobs</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 text-center">
                        <h2 className="text-2xl font-bold">450</h2>
                        <p className="text-sm text-gray-500">Applications Received</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 text-center">
                        <h2 className="text-2xl font-bold">89</h2>
                        <p className="text-sm text-gray-500">Shortlisted Candidates</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 text-center">
                        <h2 className="text-2xl font-bold">50</h2>
                        <p className="text-sm text-gray-500">Interviews Scheduled</p>
                    </div>
                </div>
                <div className="bg-white shadow-md p-6 rounded-lg">
                    <h2 className="text-lg font-bold mb-4">Recent Applications</h2>
                    <div className="space-y-4">
                        {/* Application Cards */}
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-4">
                                <img
                                    src="https://via.placeholder.com/40"
                                    alt="John Doe"
                                    className="rounded-full"
                                />
                                <div>
                                    <h3 className="font-bold">John Doe</h3>
                                    <p className="text-sm text-gray-500">
                                        Applied for: Product Designer <br />
                                        <span>07 Apr 2023</span>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="text-green-600 font-bold">$85K - $95K/PA</p>
                                <div className="flex gap-2 mt-2">
                                    <button className="text-sm px-3 py-1 border rounded-lg">
                                        View Resume
                                    </button>
                                    <button className="text-sm px-3 py-1 bg-green-500 text-white rounded-lg">
                                        Schedule Interview
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Other application cards can be added here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployerDashboard;
