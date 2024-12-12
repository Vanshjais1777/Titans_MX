import React, { useEffect, useState } from "react";
import axios from "axios";
import GovtSidebar from '../components/GovtSidebar';

const PrivateCompanyRequests = () => {
    // State to store the fetched company requests
    const [companyRequests, setCompanyRequests] = useState([]);
    // State to store the details of the company being viewed
    const [selectedCompany, setSelectedCompany] = useState(null);
    // State to store verification status
    const [verifiedCompanies, setVerifiedCompanies] = useState([]);

    // Fetch company requests when the component mounts
    useEffect(() => {
        const fetchCompanyRequests = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/request/get-allrequest", {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                setCompanyRequests(response.data); // Store the fetched data in state
            } catch (error) {
                console.error("Error fetching company requests:", error);
            }
        };

        fetchCompanyRequests();
    }, []); // Empty dependency array means this runs only once when the component mounts

    // Function to handle viewing the company details
    const handleViewCompany = (company) => {
        setSelectedCompany(company);
    };

    // Function to handle verification
    const handleVerifyCompany = (companyId,email) => {
        const password = Math.floor(Math.random()*1000000);
        const res = axios.post(import.meta.env.VITE_BACKEND_URL+"/api/request/accept-request",
            {email,password}
        );
        console.log(res);
        setVerifiedCompanies((prevState) => [...prevState, companyId]);
    };


    // Function to handle verification
    const handleRejectCompany = (companyId,email) => {
        const res = axios.post(import.meta.env.VITE_BACKEND_URL+"/api/request/reject-request",
            {email}
        );
        console.log(res);
        setVerifiedCompanies((prevState) => [...prevState, companyId]);
    };

    // Function to close the modal
    const closeModal = () => {
        setSelectedCompany(null);
    };

    return (
        <div className="flex h-screen">
            <GovtSidebar />
            <div className="container mx-auto p-6 w-screen overflow-y-auto">
                <h2 className="text-2xl font-semibold mb-6">Private Company Requests</h2>

                {/* List of company requests */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead>
                            <tr className="border-b">
                                <th className="px-4 py-2 text-left">Company Name</th>
                                <th className="px-4 py-2 text-left">Client Name</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Mobile</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companyRequests.length > 0 ? companyRequests.map((company) => (
                                <tr key={company.companyName} className="border-b">
                                    <td className="px-4 py-2">{company.companyName}</td>
                                    <td className="px-4 py-2">{`${company.firstName} ${company.lastName}`}</td>
                                    <td className="px-4 py-2">{company.email}</td>
                                    <td className="px-4 py-2">{company.mobileNumber}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            className="px-4 py-2 text-white bg-blue-500 rounded"
                                            onClick={() => handleViewCompany(company)}
                                        >
                                            View Company
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="px-4 py-2 text-center">No company requests available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Company Details Modal */}
                {selectedCompany && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                            <h3 className="text-xl font-semibold mb-4">Company Details</h3>
                            <p><strong>Company Name:</strong> {selectedCompany.companyName}</p>
                            <p><strong>Location:</strong> {selectedCompany.location}</p>
                            <p><strong>Email:</strong> {selectedCompany.email}</p>
                            <p><strong>Mobile:</strong> {selectedCompany.mobileNumber}</p>

                            {/* Verification Button */}
                            <div className="mt-4">
                            <button
                                    className={`px-4 py-2 rounded text-white ${verifiedCompanies.includes(selectedCompany.companyName)
                                        ? "bg-green-500 cursor-not-allowed"
                                        : "bg-blue-500 hover:bg-blue-600"
                                        }`}
                                    onClick={() => handleVerifyCompany(selectedCompany.companyName,selectedCompany.email)}
                                    disabled={verifiedCompanies.includes(selectedCompany.companyName)}
                                >
                                    {verifiedCompanies.includes(selectedCompany.companyName) ? "Verified" : "Verify"}
                                </button>
                                 <button
                                    className={`ms-1 px-4 py-2 rounded text-white ${verifiedCompanies.includes(selectedCompany.companyName)
                                        ? "bg-red-500 cursor-not-allowed"
                                        : "bg-red-500 hover:bg-red-600"
                                        }`}
                                    onClick={() => handleRejectCompany(selectedCompany.companyName,selectedCompany.email)}
                                    disabled={verifiedCompanies.includes(selectedCompany.companyName)}
                                >
                                    {verifiedCompanies.includes(selectedCompany.companyName) ? "Rejected" : "Reject"}
                                </button>
                            </div>

                            {/* Close Button */}
                            <div className="mt-4">
                                <button
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PrivateCompanyRequests;
