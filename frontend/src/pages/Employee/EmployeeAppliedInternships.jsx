import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmployeeSidebar from "../../components/EmployeeSidebar";

const AppliedInternships = () => {
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]); // Filtered internships
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppliedInternships = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/applicant/getApplies`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setInternships(response.data.application);
        setFilteredInternships(response.data.application);
        setLoading(false);
      } catch (error) {
        setError("Failed to load internships.");
        setLoading(false);
      }
    };

    fetchAppliedInternships();
  }, []);

  // Function to filter internships based on the search term
  const handleSearch = () => {
    const filtered = internships.filter((internship) =>
      (internship.job && 
        internship.job.title && 
        internship.job.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (internship.job && 
        internship.job.company && 
        internship.job.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (internship.job && 
        internship.job.location && 
        internship.job.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredInternships(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
          <p className="mt-2 text-gray-600">Loading applied internships...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  const handleInternshipClick = (internship) => {
    navigate(`/single-internship/${internship.job._id}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed h-full">
        <EmployeeSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        <div className="container mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-700 mb-6">Applied Internships</h1>

          {/* Search Section */}
          <div className="relative mb-6 flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
              placeholder="Search by internship title, company, location, etc."
              className="w-full border-2 border-gray-300 rounded-l-lg p-3 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSearch} // Trigger search on button click
              className="bg-blue-500 text-white px-6 py-2 rounded-r-lg hover:bg-blue-600"
            >
              Search
            </button>
          </div>

          {/* Internships List */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredInternships
              .filter(
                (internship) =>
                  internship.job &&
                  internship.job.jobType &&
                  internship.job.jobType.toLowerCase() === "internship" // Filter for internship job types
              )
              .map((internship) => (
                <div
                  key={internship.job._id}
                  className="p-5 bg-gradient-to-r from-white to-blue-50 shadow-md rounded-lg hover:shadow-lg transform hover:scale-105 transition-all cursor-pointer"
                  onClick={() => handleInternshipClick(internship)}
                >
                  <h2 className="text-xl font-semibold text-gray-700">
                    {internship.job.title}
                  </h2>
                  <p className="text-gray-600">
                    Job Type:{" "}
                    <span className="font-medium">{internship.job.jobType}</span>
                  </p>
                  <p className="text-gray-600">
                    Budget:{" "}
                    <span className="font-medium">{internship.job.budget}</span>
                  </p>
                  <p className="text-gray-600">
                    Duration:{" "}
                    <span className="font-medium">{internship.job.duration}</span>
                  </p>
                  <p className="text-gray-600">
                    Applied on:{" "}
                    <span className="font-medium">
                      {new Date(internship.job.createdAt).toLocaleDateString()}
                    </span>
                  </p>

                  <div className="mt-4">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        internship.status === "Applied"
                          ? "bg-yellow-100 text-yellow-600"
                          : internship.status === "Selected"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {internship.status}
                    </span>
                  </div>
                </div>
              ))}

            {/* Show a message if no internships are found */}
            {filteredInternships
              .filter(
                (internship) =>
                  internship.job &&
                  internship.job.jobType &&
                  internship.job.jobType.toLowerCase() === "internship"
              ).length === 0 && (
              <p className="text-gray-500 col-span-full text-center">
                No internships found matching your search criteria.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppliedInternships;