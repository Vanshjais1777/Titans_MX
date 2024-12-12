import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const JobSection = () => {
  const navigate = useNavigate();
  const [showQuickApply, setShowQuickApply] = useState(false);

  const jobs = [
    {
      id: 1,
      company: "Google",
      title: "Software Engineering Intern",
      location: "Mountain View",
      type: "Internship",
      exp: "0-1 Years exp.",
      salary: "$2000",
      date: "26 Mar 2023",
    },
    {
      id: 2,
      company: "Meta",
      title: "Data Science Intern",
      location: "Menlo Park",
      type: "Internship",
      exp: "0-2 Years exp.",
      salary: "$2200",
      date: "10 Jan 2023",
    },
    {
      id: 3,
      company: "Microsoft",
      title: "Product Management Intern",
      location: "Redmond",
      type: "Internship",
      exp: "0-1 Years exp.",
      salary: "$2100",
      date: "2 Feb 2023",
    },
    {
      id: 4,
      company: "Amazon",
      title: "UX Design Intern",
      location: "Seattle",
      type: "Internship",
      exp: "0-2 Years exp.",
      salary: "$1900",
      date: "1 Jan 2023",
    },
    {
      id: 5,
      company: "Tesla",
      title: "Mechanical Engineering Intern",
      location: "Palo Alto",
      type: "Internship",
      exp: "0-1 Years exp.",
      salary: "$1800",
      date: "26 Jan 2023",
    },
    {
      id: 6,
      company: "Apple",
      title: "Marketing Intern",
      location: "Cupertino",
      type: "Internship",
      exp: "0-2 Years exp.",
      salary: "$2000",
      date: "30 Jan 2023",
    },
    {
      id: 7,
      company: "Netflix",
      title: "Content Strategy Intern",
      location: "Los Angeles",
      type: "Internship",
      exp: "0-1 Years exp.",
      salary: "$1900",
      date: "02 Feb 2023",
    },
    {
      id: 8,
      company: "Adobe",
      title: "Graphic Design Intern",
      location: "San Jose",
      type: "Internship",
      exp: "0-2 Years exp.",
      salary: "$2000",
      date: "15 Feb 2023",
    },
  ];

  return (
    <>
      <section className="bg-gray-100 py-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="bg-green-800 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-4">
                Hire talents & experts for your web development
              </h2>
              <p className="mb-6">
                Connect with experienced professionals ready to deliver
                top-notch web solutions for your business needs.
              </p>
              <button className="bg-white text-green-800 px-4 py-2 rounded hover:bg-gray-200 transition duration-300">
                Hire Us
              </button>
            </div>
            <div className="bg-green-600 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-bold mb-4">
                We Are Expert In Web Design and Development
              </h2>
              <p className="mb-6">
                Join our team of experts committed to creating impactful and
                innovative digital experiences.
              </p>
              <button className="bg-white text-green-800 px-4 py-2 rounded hover:bg-gray-200 transition duration-300">
                Join Us
              </button>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mt-10 mb-6">
            Featured Internships & Jobs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-gradient-to-r from-purple-200 to-purple-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {job.title}
                </h3>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-gray-500 text-sm">
                  {job.location} · {job.type} · {job.exp}
                </p>
                <p className="text-gray-800 font-bold mt-4">
                  {job.salary}/Year
                </p>
                <p className="text-gray-400 text-sm">{job.date}</p>
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => navigate("/single-internship")}
                    className="text-green-600 border border-green-600 px-4 py-2 rounded hover:bg-green-600 hover:text-white transition duration-300">
                    View Detail
                  </button>
                  <button
                    onClick={() => setShowQuickApply(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">
                    Quick Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
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

export default JobSection;
