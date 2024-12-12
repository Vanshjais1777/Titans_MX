import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QuickApply from "./QuickApply";

const InternshipPage = () => {
  const [internships, setInternships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showQuickApply, setShowQuickApply] = useState(false);
  const navigate = useNavigate();

  const fetchInternships = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/job/read-internship`);
      setInternships(response.data.internship); // Assuming the API response contains an 'internships' array
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching internships:", err);
      setError("Failed to fetch internships.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships(); // Fetch internships on component mount
  }, []);

  const loadMoreInternships = () => {
    setIsLoading(true);
    setTimeout(() => {
      setInternships((prevInternships) => [...prevInternships, ...internships]); // Simulating load more
      setIsLoading(false);
    }, 1000);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      loadMoreInternships();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [internships]);

  return (
    <>
      <section className="bg-gray-100 py-10 mt-8">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mt-10 mb-6">
            Explore Internships
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {internships.map((internship, index) => (
              <div
                key={`${internship._id}-${index}`}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {internship.title}
                </h3>
                <p className="text-gray-600">{internship.company}</p>
                <p className="text-gray-500 text-sm">
                  {internship.location?.city}, {internship.location?.state} · {internship.type} · {internship.duration}
                </p>
                <p className="text-gray-800 font-bold mt-4">
                  {internship.stipend ? `${internship.stipend} / Month` : "Unpaid"}
                </p>
                <p className="text-gray-400 text-sm">
                  {new Date(internship.postedDate).toLocaleDateString()}
                </p>
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => navigate(`/single-internship/${internship._id}`)}
                    className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition duration-300">
                    View Detail
                  </button>
                  <button
                    onClick={() => setShowQuickApply(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                    Quick Apply
                  </button>
                </div>
              </div>
            ))}
          </div>

          {isLoading && (
            <div className="text-center mt-5 text-blue-600">
              Loading more internships...
            </div>
          )}
        </div>
      </section>

      {showQuickApply && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 relative">
            <button
              onClick={() => setShowQuickApply(false)}
              className="absolute top-2 right-2 bg-gray-300 text-gray-700 rounded-full p-2 hover:bg-gray-400">
              ✕
            </button>
            <QuickApply />
          </div>
        </div>
      )}
    </>
  );
};

export default InternshipPage;
