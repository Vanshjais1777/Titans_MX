import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const SingleJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState(null);
  const [error, setError] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setUserRole(storedRole);

    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/job/read-job/${id}`
        );
        console.log(response.data.job);
        setJobDetails(response.data.job);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Failed to fetch job details.");
      }
    };

    fetchJobDetails();

    const appliedState = localStorage.getItem(`applied_${id}`);
    if (appliedState) {
      setIsApplied(true);
    }

    if (storedRole === "employer" || storedRole === "govt") {
      const fetchApplicants = async () => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/applicant/getapplicants`,
            { jobId: id },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setApplicants(response.data.data);
        } catch (error) {
          console.error("Error fetching applicants:", error);
          setError("Failed to fetch applicants.");
        }
      };

      fetchApplicants();
    }
  }, [id]);

  const handleApply = async () => {
    setIsApplying(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User is not authenticated. Please log in.");
        setIsApplying(false);
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/applicant/apply`,
        { jobId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Application successful!");
      setIsApplied(true);
      localStorage.setItem(`applied_${id}`, "true");
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("Failed to apply for the job.");
    } finally {
      setIsApplying(false);
    }
  };

  const handleAccept = async (applicantId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User is not authenticated. Please log in.");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/applicant/approve`,
        { applicantId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Applicant accepted!");
      // Update the applicant list or UI state as needed
      setApplicants((prevApplicants) =>
        prevApplicants.filter((applicant) => applicant._id !== applicantId)
      );
    } catch (error) {
      console.error("Error accepting applicant:", error);
      alert("Failed to accept the applicant.");
    }
  };

  const handleReject = async (applicantId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User is not authenticated. Please log in.");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/applicant/reject`,
        { applicantId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Applicant rejected!");
      // Update the applicant list or UI state as needed
      setApplicants((prevApplicants) =>
        prevApplicants.filter((applicant) => applicant._id !== applicantId)
      );
    } catch (error) {
      console.error("Error rejecting applicant:", error);
      alert("Failed to reject the applicant.");
    }
  };

  if (!jobDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {error ? <p className="text-red-500">{error}</p> : <p>Loading...</p>}
      </div>
    );
  }

  const {
    title,
    description,
    budget,
    budgetType,
    jobType,
    experienceLevel,
    duration,
    startDate,
    endDate,
    skillsRequired = [],
    location = {},
    category,
    subCategory,
    applicantsCount,
    isUrgent,
  } = jobDetails;

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen py-10 px-6 mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <button
              onClick={() => navigate(-1)}
              className="text-blue-500 hover:text-blue-700 mb-4 bg-blue-200 py-2 px-4 rounded-md font-medium"
            >
              &larr; Back
            </button>

            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <div className="text-gray-600">
              <p><strong>Category:</strong> {category} / {subCategory}</p>
              <p><strong>Budget:</strong> ₹{budget} ({budgetType})</p>
              <p><strong>Job Type:</strong> {jobType}</p>
              <p><strong>Experience Level:</strong> {experienceLevel}</p>
              <p><strong>Duration:</strong> {duration}</p>
              <p><strong>Start Date:</strong> {new Date(startDate).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(endDate).toLocaleDateString()}</p>
              <p><strong>Applicants Count:</strong> {applicantsCount}</p>
              <p><strong>Urgent:</strong> {isUrgent ? "Yes" : "No"}</p>
              <p><strong>Location:</strong> {`${location.address || ""}, ${location.city || ""}, ${location.state || ""}, ${location.country || ""}`}</p>
            </div>

            <h2 className="text-xl font-semibold mt-6">Job Description</h2>
            <p className="text-gray-600">{description}</p>

            {skillsRequired.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mt-6">Skills Required</h2>
                <div className="flex flex-wrap gap-3">
                  {skillsRequired.map((skill, index) => (
                    <span key={index} className="bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </>
            )}

            {userRole === "employee" && (
              <div className="mt-8">
                <button
                  onClick={handleApply}
                  disabled={isApplying || isApplied}
                  className={`${isApplying || isApplied ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white font-bold py-3 px-6 rounded-lg`}
                >
                  {isApplied ? "Applied" : isApplying ? "Applying..." : "Apply Now"}
                </button>
              </div>
            )}

            {(userRole === "employer" || userRole === "govt") && applicants.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold">Applicants</h2>
                <ul>
                  {applicants.map((applicant, index) => (
                    <li key={index} className="border-b py-2">
                      <p><strong>Name:</strong> {applicant.firstName + " " + applicant.lastName}</p>
                      <p><strong>Email:</strong> {applicant.email}</p>
                      {/* Add other applicant details as needed */}
                      <div className="mt-2">
                        <button
                          onClick={() => handleAccept(applicant._id)}
                          className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-4 rounded-lg mr-2"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(applicant._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-lg"
                        >
                          Reject
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleJob;
