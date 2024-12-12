import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const SingleInternship = () => {
  const { id } = useParams(); // Get the internship ID from the URL
  const [internshipDetails, setInternshipDetails] = useState(null);
  const [error, setError] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [isApplied, setIsApplied] = useState(false); // Track if the user has applied

  useEffect(() => {
    // Fetch internship details
    const fetchInternshipDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/job/read-job/${id}`
        );
        setInternshipDetails(response.data.job);
      } catch (err) {
        console.error("Error fetching internship details:", err);
        setError("Failed to fetch internship details.");
      }
    };

    fetchInternshipDetails();

    // Check if the user has already applied (persisted in local storage)
    const appliedState = localStorage.getItem(`applied_internship_${id}`);
    if (appliedState) {
      setIsApplied(true);
    }
  }, [id]);

  const handleApply = async () => {
    setIsApplying(true);
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User is not authenticated. Please log in.");
        setIsApplying(false);
        return;
      }

      // Send POST request with the token in the Authorization header
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/applicant/apply`,
        {
          jobId: id, // Data sent to the backend
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        }
      );

      alert("Application successful!");
      setIsApplied(true);

      // Persist the applied state in local storage
      localStorage.setItem(`applied_internship_${id}`, "true");
    } catch (error) {
      console.error("Error applying for internship:", error);
      alert("Failed to apply for the internship.");
    } finally {
      setIsApplying(false);
    }
  };

  if (!internshipDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {error ? <p className="text-red-500">{error}</p> : <p>Loading...</p>}
      </div>
    );
  }

  const {
    role,
    title,
    location,
    experience,
    salary,
    description,
    skillsRequired = [],
    duration,
    startDate,
    endDate,
    applicantsCount,
    isUrgent,
  } = internshipDetails;

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen py-10 px-6 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Back Button */}
            <button
              onClick={() => window.history.back()} // Navigate back to the previous page
              className="text-blue-600 hover:text-blue-800 mb-4"
            >
              &larr; Back
            </button>

            <h1 className="text-3xl font-bold mb-4">{role}</h1>

            <div className="text-gray-600">
              <p>
                <strong>Company:</strong> {title}
              </p>
              <p>
                <strong>Location:</strong>{" "}
                {`${location.address || ""}, ${location.city || ""}, ${location.state || ""}, ${location.country || ""}`}
              </p>
              <p>
                <strong>Experience:</strong> {experience}
              </p>
              <p>
                <strong>Salary:</strong> {salary}
              </p>
              <p>
                <strong>Duration:</strong> {duration}
              </p>
              <p>
                <strong>Start Date:</strong> {new Date(startDate).toLocaleDateString()}
              </p>
              <p>
                <strong>End Date:</strong> {new Date(endDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Applicants Count:</strong> {applicantsCount}
              </p>
              <p>
                <strong>Urgent:</strong> {isUrgent ? "Yes" : "No"}
              </p>
            </div>

            <h2 className="text-xl font-semibold mt-6">Internship Description</h2>
            <p className="text-gray-600">{description}</p>

            {skillsRequired.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mt-6">Skills Required</h2>
                <div className="flex flex-wrap gap-3">
                  {skillsRequired.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </>
            )}

            <div className="mt-8">
              <button
                onClick={handleApply}
                disabled={isApplying || isApplied} // Disable if applying or already applied
                className={`${isApplying || isApplied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
                  } text-white font-bold py-3 px-6 rounded-lg`}
              >
                {isApplied ? "Applied" : isApplying ? "Applying..." : "Apply Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleInternship;
