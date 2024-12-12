import React from "react";
import EmployeeSidebar from "../../components/EmployeeSidebar";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const EmployeeDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <EmployeeSidebar />

            {/* Main Content */}
            <div className="ml-72 flex-1 h-screen overflow-y-auto bg-gray-50 p-6">
                <header className="mb-6 flex">
                    <div>
                        <h1 className="text-2xl font-bold">Candidate Dashboard</h1>
                        <p className="text-sm text-gray-500">Dashboard / Candidate Statistics</p>
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
                        <h2 className="text-2xl font-bold">523</h2>
                        <p className="text-sm text-gray-500">Applied Jobs</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 text-center">
                        <h2 className="text-2xl font-bold">523</h2>
                        <p className="text-sm text-gray-500">Saved Jobs</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 text-center">
                        <h2 className="text-2xl font-bold">523</h2>
                        <p className="text-sm text-gray-500">Viewed Jobs</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 text-center">
                        <h2 className="text-2xl font-bold">523</h2>
                        <p className="text-sm text-gray-500">Total Reviews</p>
                    </div>
                </div>
                <div className="bg-white shadow-md p-6 rounded-lg">
                    <h2 className="text-lg font-bold mb-4">Shortlisted Jobs</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-4">
                                <img
                                    src="https://via.placeholder.com/40"
                                    alt="Tripadvisor"
                                    className="rounded-full"
                                />
                                <div>
                                    <h3 className="font-bold">Product Designer</h3>
                                    <p className="text-sm text-gray-500">
                                        Tripadvisor, California <br />
                                        <span>07 Apr 2023</span>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="text-green-600 font-bold">$85K - $95K/PA</p>
                                <div className="flex gap-2 mt-2">
                                    <button className="text-sm px-3 py-1 border rounded-lg">
                                        View Detail
                                    </button>
                                    <button className="text-sm px-3 py-1 bg-green-500 text-white rounded-lg">
                                        Quick Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-4">
                                <img
                                    src="https://via.placeholder.com/40"
                                    alt="Pinterest"
                                    className="rounded-full"
                                />
                                <div>
                                    <h3 className="font-bold">Product Designer</h3>
                                    <p className="text-sm text-gray-500">
                                        Pinterest, Allahabad <br />
                                        <span>02 Apr 2023</span>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="text-green-600 font-bold">$90K - $100K/PA</p>
                                <div className="flex gap-2 mt-2">
                                    <button className="text-sm px-3 py-1 border rounded-lg">
                                        View Detail
                                    </button>
                                    <button className="text-sm px-3 py-1 bg-green-500 text-white rounded-lg">
                                        Quick Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;