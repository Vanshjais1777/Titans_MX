import React, { useContext } from "react";
import JobCard from "../../components/JobCard.jsx";
import EmployerSidebar from "../../components/EmployerSidebar.jsx";
import GovtSidebar from "../../components/GovtSidebar";
import EmployeeSidebar from "../../components/EmployeeSidebar";

import { useAuth } from "../../context/AuthContext.jsx"; // Import userAuth context

const EmployerCertifications = () => {
    const certifications = [
        {
            title: "AWS Certification",
            company: "Amazon",
            applicants: 320,
            postedDate: "17 Oct 2023",
            expiryDate: "17 Jan 2024",
        },
        {
            title: "Google Cloud Certification",
            company: "Google",
            applicants: 210,
            postedDate: "25 Oct 2023",
            expiryDate: "25 Feb 2024",
        },
        // Add more certifications as needed...
    ];

    const { role } = useAuth(); // Access the role from the context

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
        <div className="flex bg-gray-100 h-screen">
            <div>{renderSidebar()}</div> {/* Render the sidebar based on role */}
            <div className="flex p-5 flex-col w-full h-screen bg-gray-50 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-4">Manage Certifications</h1>
                <div className="mt-3">
                    {certifications.map((certification, index) => (
                        <JobCard key={index} {...certification} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmployerCertifications;
