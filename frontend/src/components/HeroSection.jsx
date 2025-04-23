import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaRobot } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Chatbot from "./Chatbot";
import axios from "axios";
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", documentChangeHandler);

    return () =>
      mediaQueryList.removeEventListener("change", documentChangeHandler);
  }, [query]);

  return matches;
};

const skills = [
  "Web Development",
  "Data Analysis",
  "Digital Marketing",
  "Machine Learning",
  "Cybersecurity",
  "UI/UX Design",
  "Project Management",
  "Mobile App Development",
  "Cloud Computing",
  "Software Testing",
  "Content Writing",
  "Graphic Design",
  "Blockchain Development",
  "Game Development",
  "Network Engineering",
  "Business Analytics",
  "Video Editing",
  "Financial Analysis",
  "Sales and Marketing",
  "Human Resources",
  "Artificial Intelligence",
  "SEO (Search Engine Optimization)",
  "DevOps",
  "Quality Assurance",
  "Product Management",
  "Copywriting",
  "Customer Support",
  "Accounting",
  "Database Administration",
  "Public Relations",
];

const mockData = [
  {
    id: 1,
    type: "Job",
    category: "Private",
    title: "Software Developer",
    keywords: ["web development", "software", "coding"],
  },
  {
    id: 2,
    type: "Internship",
    category: "Government",
    title: "Data Analyst Intern",
    keywords: ["data analysis", "analytics", "statistics"],
  },
  {
    id: 3,
    type: "Training",
    category: "Private",
    title: "Digital Marketing Training",
    keywords: ["digital marketing", "seo", "marketing"],
  },
  {
    id: 4,
    type: "Job",
    category: "International",
    title: "AI Specialist",
    keywords: ["artificial intelligence", "machine learning", "ai"],
  },
  {
    id: 5,
    type: "Internship",
    category: "Private",
    title: "UI/UX Design Intern",
    keywords: ["ui/ux", "design", "user experience"],
  },
  {
    id: 6,
    type: "Job",
    category: "Private",
    title: "Cloud Engineer",
    keywords: ["cloud computing", "devops", "aws"],
  },
  {
    id: 7,
    type: "Internship",
    category: "International",
    title: "Cybersecurity Intern",
    keywords: ["cybersecurity", "network security", "information security"],
  },
  {
    id: 8,
    type: "Training",
    category: "Private",
    title: "Project Management Training",
    keywords: ["project management", "leadership", "planning"],
  },
  {
    id: 9,
    type: "Job",
    category: "Private",
    title: "Mobile App Developer",
    keywords: ["android", "ios", "mobile development"],
  },
  {
    id: 10,
    type: "Internship",
    category: "Government",
    title: "Research Assistant",
    keywords: ["research", "analysis", "data"],
  },
  {
    id: 11,
    type: "Training",
    category: "International",
    title: "Cloud Computing Training",
    keywords: ["cloud", "aws", "azure"],
  },
  {
    id: 12,
    type: "Job",
    category: "International",
    title: "Blockchain Developer",
    keywords: ["blockchain", "crypto", "decentralized"],
  },
  {
    id: 13,
    type: "Internship",
    category: "Private",
    title: "Graphic Design Intern",
    keywords: ["graphic design", "adobe", "illustrator"],
  },
  {
    id: 14,
    type: "Training",
    category: "Private",
    title: "Full Stack Development Training",
    keywords: ["full stack", "react", "node.js"],
  },
  {
    id: 15,
    type: "Job",
    category: "Private",
    title: "Game Developer",
    keywords: ["game development", "unity", "unreal engine"],
  },
  {
    id: 16,
    type: "Internship",
    category: "International",
    title: "Machine Learning Intern",
    keywords: ["machine learning", "data science", "python"],
  },
  {
    id: 17,
    type: "Training",
    category: "Private",
    title: "Big Data Training",
    keywords: ["big data", "hadoop", "spark"],
  },
  {
    id: 18,
    type: "Job",
    category: "Private",
    title: "Database Administrator",
    keywords: ["database", "sql", "mysql"],
  },
  {
    id: 19,
    type: "Internship",
    category: "Government",
    title: "Cybersecurity Analyst Intern",
    keywords: ["cybersecurity", "risk", "vulnerabilities"],
  },
  {
    id: 20,
    type: "Training",
    category: "International",
    title: "Artificial Intelligence Training",
    keywords: ["ai", "neural networks", "deep learning"],
  },
  {
    id: 21,
    type: "Job",
    category: "Private",
    title: "DevOps Engineer",
    keywords: ["devops", "ci/cd", "automation"],
  },
  {
    id: 22,
    type: "Internship",
    category: "Private",
    title: "Content Writer Intern",
    keywords: ["content writing", "blogs", "copywriting"],
  },
  {
    id: 23,
    type: "Training",
    category: "Government",
    title: "Leadership Skills Training",
    keywords: ["leadership", "team management", "communication"],
  },
  {
    id: 24,
    type: "Job",
    category: "International",
    title: "Front-End Developer",
    keywords: ["html", "css", "javascript"],
  },
  {
    id: 25,
    type: "Internship",
    category: "Private",
    title: "Social Media Manager Intern",
    keywords: ["social media", "branding", "campaigns"],
  },
  {
    id: 26,
    type: "Training",
    category: "Private",
    title: "Software Testing Training",
    keywords: ["software testing", "qa", "automation testing"],
  },
  {
    id: 27,
    type: "Job",
    category: "Government",
    title: "Network Engineer",
    keywords: ["networking", "routers", "switches"],
  },
  {
    id: 28,
    type: "Internship",
    category: "International",
    title: "Environmental Research Intern",
    keywords: ["environment", "sustainability", "climate"],
  },
  {
    id: 29,
    type: "Training",
    category: "Private",
    title: "Ethical Hacking Training",
    keywords: ["hacking", "cybersecurity", "pentesting"],
  },
  {
    id: 30,
    type: "Job",
    category: "International",
    title: "Robotics Engineer",
    keywords: ["robotics", "automation", "ai"],
  },
];

const Hero = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [jobType, setJobType] = useState("Looking for");
  const [workType, setWorkType] = useState("Internship/Job Type");
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [showSearchFilter, setShowSearchFilter] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  const handleSearch = () => {
    setIsLoading(true);

    setTimeout(async () => {
      const keyword = searchKeyword.trim().toLowerCase();

      let response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/job/read-jobs", {
        params: { keyword },
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
      });
      response = response.data;
      console.log(response);
      const filteredResults = mockData
        .filter((item) => {
          const matchesKeyword = keyword
            ? item.keywords.some((k) => k.includes(keyword)) // Check if the keyword is in the item's keywords
            : true;
          const matchesType =
            jobType !== "Looking for" ? item.type === jobType : true;
          const matchesCategory =
            workType !== "Internship/Job Type"
              ? item.category === workType
              : true;

          return matchesKeyword && matchesType && matchesCategory;
        })
        .slice(0, 6); // Limit to 6 results

      setResults(response.jobs);
      setIsLoading(false);
    }, 1000); // Simulate loader delay
  };

  const generateScatterPosition = () => {
    const safeZone = { topMin: 30, topMax: 70, leftMin: 30, leftMax: 70 };
    const randomValue = (min, max) => Math.random() * (max - min) + min;

    let top = randomValue(0, 100);
    let left = randomValue(0, 100);

    while (
      top > safeZone.topMin &&
      top < safeZone.topMax &&
      left > safeZone.leftMin &&
      left < safeZone.leftMax
    ) {
      top = randomValue(0, 100);
      left = randomValue(0, 100);
    }

    return { top: `${top}%`, left: `${left}%` };
  };

  return (
    <div
      className="relative bg-gradient-to-br from-cyan-400 to-orange-100 bg-cover bg-center h-screen overflow-hidden"
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative flex flex-col items-center justify-center h-full px-4 text-center text-white">
        <h1 className="text-2xl font-bold md:text-5xl text-gray-900">
          Find The Great Exciting & Remote-Friendly Jobs
        </h1>
        <p className="mt-4 text-sm md:text-lg text-gray-900">
          Getting a new job is never easy. Check what new jobs we have in store
          for you on Skill Sphere.
        </p>

        {!showSearchFilter && (
          <button
            className="w-full max-w-lg p-4 mt-6 font-bold text-md text-gray-800 bg-gradient-to-r from-green-400 to-blue-500 rounded-md shadow-lg hover:scale-105 transition-transform"
            onClick={() => setShowSearchFilter(true)}>
            Explore the Job / Internship of Your Choice by our Job & Internship
            Prediction Model
          </button>
        )}

        {showSearchFilter && (
          <div className="w-full max-w-lg md:max-w-4xl p-4 mt-6 bg-white rounded-md shadow-md animate-fadeIn">
            <div className="flex flex-col md:flex-row">
              <div className="flex items-center w-full p-2 border-b md:border-r md:border-b-0 md:w-1/3">
                <FaSearch className="mr-2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Skills, Designations, Keyword"
                  className="w-full p-2 text-gray-800 outline-none"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </div>
              <div className="flex items-center w-full p-2 border-b md:border-r md:border-b-0 md:w-1/3">
                <FaFilter className="mr-2 text-gray-500" />
                <select
                  className="w-full p-2 text-gray-800 outline-none"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}>
                  <option>Looking for</option>
                  <option>Job</option>
                  <option>Training</option>
                  <option>Internship</option>
                </select>
              </div>
              <div className="flex items-center w-full p-2 border-b md:border-r md:border-b-0 md:w-1/3">
                <FaFilter className="mr-2 text-gray-500" />
                <select
                  className="w-full p-1 text-gray-800 outline-none"
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value)}>
                  <option>Internship/Job Type</option>
                  <option>Private</option>
                  <option>Government</option>
                  <option>International</option>
                </select>
              </div>
              <button
                onClick={handleSearch}
                className="w-full p-2 mt-4 md:mt-0 font-bold text-xl text-white bg-green-500 rounded-md md:ml-4 md:w-1/3 transition-transform duration-200 hover:scale-105 hover:shadow-lg animate-pulse hover:animate-none">
                Search
              </button>
            </div>

            {/* Loader */}
            {isLoading && (
              <div className="flex justify-center items-center mt-4">
                <div className="loader"></div>
              </div>
            )}

            {/* Display Results */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.length > 0 && !isLoading
                ? results.map((result) => (
                  <div
                    key={result._id}
                    className="bg-white rounded-lg shadow-md p-4 hover:scale-105 hover:shadow-lg transition-transform duration-300">
                    <h3 className="text-lg font-bold text-gray-800">
                      {result.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      Type: {result.type}
                    </p>
                    <p className="text-sm text-blue-500 mt-1">
                      Category: {result.category}
                    </p>
                    <button
                      className="mt-4 bg-blue-500 text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                      onClick={() => navigate(`/single-job/${result._id}`)}>
                      Explore More
                    </button>
                  </div>
                ))
                : !isLoading && (
                  <p className="text-gray-500 text-center col-span-full">
                    No results found.
                  </p>
                )}
            </div>
          </div>
        )}
      </div>

      {!showSearchFilter &&
        !isMobile &&
        skills.map((skill, index) => {
          const position = generateScatterPosition();
          return (
            <div
              key={index}
              className="absolute px-4 py-2 bg-purple-200 text-gray-800 font-semibold rounded-full shadow-md transition-all duration-500 ease-in-out opacity-60 hover:opacity-100 hover:scale-110 hover:border-2 hover:border-purple-300 hover:shadow-lg hover:font-bold"
              style={{
                ...position,
                animation: `slowFloat ${(index % 5) + 8}s ease-in-out infinite`,
              }}>
              {skill}
            </div>
          );
        })}

      <button
        onClick={() => setIsChatbotOpen(true)}
        className="fixed bottom-6 left-6 bg-gradient-to-r from-green-400 to-blue-500 text-white p-5 rounded-full shadow-lg hover:scale-110 transition-transform">
        <FaRobot size={32} />
      </button>

      {isChatbotOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl h-[90%] bg-white rounded-lg shadow-xl overflow-auto">
            <Chatbot />
            <button
              onClick={() => setIsChatbotOpen(false)}
              className="fixed top-4 right-4 bg-gray-200 bg-opacity-50 rounded-full p-3 text-gray-700 hover:text-gray-900 hover:bg-opacity-100 transition duration-200">
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
