import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const JobSection = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [selectedJobType, setSelectedJobType] = useState("All");
  const [jobTypes, setJobTypes] = useState(["All", "Full-Time", "Part-Time", "Internship"]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState({});
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [quickApplyJob, setQuickApplyJob] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/job/read-jobs`);
      const jobsData = response.data.jobs;
      setJobs(jobsData);

      const newCategories = {};
      jobsData.forEach((job) => {
        const category = job.area;
        const subCategory = job.subCategory;
        if (!newCategories[category]) newCategories[category] = [];
        if (subCategory && !newCategories[category].includes(subCategory)) {
          newCategories[category].push(subCategory);
        }
      });

      setCategories(newCategories);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to fetch jobs.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory("All");
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handleQuickApply = (job) => {
    setQuickApplyJob(job);
  };

  const handleConfirmApplication = async () => {
    try {
      console.log(`Applied for job: ${quickApplyJob.title}`);
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
        setQuickApplyJob(null);
      }, 3000);
    } catch (err) {
      console.error("Error during application submission:", err);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesCategory = selectedCategory === "All" || job.area === selectedCategory;
    const matchesSubCategory = selectedSubCategory === "All" || job.subCategory === selectedSubCategory;
    const matchesJobType = selectedJobType === "All" || job.jobType.toLowerCase() === selectedJobType.toLowerCase();
    return matchesCategory && matchesSubCategory && matchesJobType;
  });

  return (
    <section className="bg-gray-100 py-10 mt-8 px-4 w-full">
      <div className="container mx-auto flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-1/4 w-full">
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-3">
            <li
              onClick={() => handleCategoryClick("All")}
              className={`cursor-pointer p-2 rounded ${selectedCategory === "All" ? "bg-green-600 text-white" : "bg-white text-gray-700 border border-gray-300"} hover:bg-green-600 hover:text-white`}
            >
              All
            </li>
            {Object.keys(categories).map((category) => (
              <div key={category}>
                <li
                  onClick={() => handleCategoryClick(category)}
                  className={`cursor-pointer p-2 rounded ${selectedCategory === category ? "bg-green-600 text-white" : "bg-white text-gray-700 border border-gray-300"} hover:bg-green-600 hover:text-white`}
                >
                  {category}
                </li>
                {expandedCategory === category && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pl-6 space-y-2 mt-2"
                  >
                    <li
                      onClick={() => setSelectedSubCategory("All")}
                      className={`cursor-pointer p-2 rounded ${selectedSubCategory === "All" ? "bg-green-600 text-white" : "bg-white text-gray-700 border border-gray-300"} hover:bg-green-600 hover:text-white`}
                    >
                      All
                    </li>
                    {categories[category].map((subCategory) => (
                      <li
                        key={subCategory}
                        onClick={() => setSelectedSubCategory(subCategory)}
                        className={`cursor-pointer p-2 rounded ${selectedSubCategory === subCategory ? "bg-green-600 text-white" : "bg-white text-gray-700 border border-gray-300"} hover:bg-green-600 hover:text-white`}
                      >
                        {subCategory}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </div>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <div className="lg:w-3/4 w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Explore Job Opportunities</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <motion.div
                key={job._id}
                className="w-72 bg-gradient-to-r from-purple-200 to-purple-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
                <p className="text-black-600">{job.description}</p>
                <p className="text-black-500 text-sm">
                  {job.location?.city}, {job.location?.state} · {job.type} · {job.experience}
                </p>
                <p className="text-gray-800 font-bold mt-4">Salary: ₹{job.budget}</p>
                <p className="text-gray-black text-sm">{new Date(job.date).toLocaleDateString()}</p>
                <div className="mt-6 flex flex-col sm:flex-row justify-between gap-2">
                  <button
                    onClick={() => navigate(`/employee/single-job/${job._id}`)}
                    className="text-green-600 border border-green-600 px-4 py-2 rounded hover:bg-green-600 hover:text-white transition duration-300"
                  >
                    View Detail
                  </button>
                  <button
                    onClick={() => handleQuickApply(job)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
                  >
                    Quick Apply
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {isLoading && <div className="text-center mt-5 text-green-600">Loading more jobs...</div>}
        </div>
      </div>

      {/* QuickApply Popup */}
      {quickApplyJob && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-11/12 sm:w-3/4 max-w-sm relative">
            <button
              onClick={() => setQuickApplyJob(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
            <h3 className="text-lg font-semibold mb-2">Quick Apply</h3>
            <p className="text-sm mb-4">
              You are applying for: <strong>{quickApplyJob.title}</strong>
            </p>
            <button
              onClick={handleConfirmApplication}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
            >
              Confirm Application
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-11/12 sm:w-3/4 max-w-sm relative">
            <h3 className="text-lg font-semibold mb-2 text-green-600">Application Submitted!</h3>
            <p className="text-sm">Your application for the job has been successfully submitted.</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default JobSection;
