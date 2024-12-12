import React from "react";
import { FaBriefcase, FaBookmark, FaUserFriends, FaCommentDots } from "react-icons/fa";
import JobCard from "./JobCard";

const DashboardContent = () => {
  const jobs = [
    {
      company: "Tripadvisor",
      role: "Technical Content Writer",
      applicants: 244,
      postedDate: "17 Apr 2023",
      expiryDate: "12 Jun 2024",
    },
    {
      company: "Pinterest",
      role: "New Shopify Developer",
      applicants: 110,
      postedDate: "17 Apr 2023",
      expiryDate: "12 Jun 2024",
    },
    {
      company: "Shopify",
      role: "Sr. Magento Developer",
      applicants: 320,
      postedDate: "17 Apr 2023",
      expiryDate: "12 Jun 2024",
    },
    {
      company: "Dreezoo",
      role: "Sr. Code Igniter Developer",
      applicants: 170,
      postedDate: "17 Apr 2023",
      expiryDate: "12 Jun 2024",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Employer Dashboard</h1>
        <p className="text-sm text-gray-500">
          Employer / Dashboard / <span className="text-green-500">Employer Dashboard</span>
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Statistics Cards */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <div className="bg-green-100 p-4 rounded-full">
            <FaBriefcase className="text-green-500 text-2xl" />
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-800">760</h2>
            <p className="text-sm text-gray-500">Posted Jobs</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <div className="bg-orange-100 p-4 rounded-full">
            <FaBookmark className="text-orange-500 text-2xl" />
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-800">12560</h2>
            <p className="text-sm text-gray-500">Saved Candidates</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <div className="bg-red-100 p-4 rounded-full">
            <FaUserFriends className="text-red-500 text-2xl" />
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-800">672</h2>
            <p className="text-sm text-gray-500">Applicants</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
          <div className="bg-blue-100 p-4 rounded-full">
            <FaCommentDots className="text-blue-500 text-2xl" />
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-800">215</h2>
            <p className="text-sm text-gray-500">Total Review</p>
          </div>
        </div>
      </div>

      {/* Job Postings Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Posted Jobs</h2>
        <div className="space-y-4">
          {jobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
