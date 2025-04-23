import React from "react";
import Header from '../components/Header';

const WebPage = () => {
  return (
    <>
      <Header />
      <div className="bg-gradient-to-br from-blue-50 via-purple-100 to-purple-200 min-h-screen mt-16">
        {/* Main Section */}
        <main className="container mx-auto py-12 px-6 flex flex-col lg:flex-row items-center gap-16">
          {/* Left Section */}
          <div className="flex-1 space-y-6">
            {/* Course Title */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-black-900 leading-tight">
              Web Development Course
            </h1>

            {/* Ratings */}
            <div className="flex items-center space-x-3">
              <div className="text-yellow-400 text-2xl sm:text-3xl">★★★★★</div>
              <span className="text-black-700 font-medium text-md sm:text-lg">120,432 Ratings</span>
            </div>

            {/* Highlights */}
            <p className="text-md sm:text-lg text-black-700 leading-relaxed">
              <strong className="text-purple-900">Top-Rated</strong> Web Development Course by{" "}
              <a href="#" className="text-purple-700 underline hover:text-blue-800">
                Skill Sphere
              </a>
            </p>
            <ul className="space-y-4 text-gray-700 text-sm sm:text-base">
              <li className="flex items-start space-x-3">
                <span className="text-purple-600">✔</span>
                <span>Learn HTML, CSS, JavaScript, React, Node.js, and more</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-purple-600">✔</span>
                <span>Build real-world projects and responsive websites</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-purple-600">✔</span>
                <span>Access live sessions with industry experts and mentors</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-purple-600">✔</span>
                <span>Earn certifications from Skill Sphere and industry leaders</span>
              </li>
            </ul>

            {/* Requirements Section */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-black-800 mb-4">Requirements</h2>
              <ul className="list-disc list-inside text-black-700 text-sm sm:text-base">
                <li>No prior experience is required. Start from the basics</li>
                <li>A computer with internet access is needed</li>
              </ul>
            </div>

            {/* Description Section */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-black-800 mb-4">Description</h2>
              <p className="text-black-700 text-sm sm:text-base leading-relaxed">
                This course provides a comprehensive journey through the world of web development. From foundational coding skills to advanced frameworks, you’ll learn everything required to build and deploy professional-grade websites and applications.
              </p>
            </div>

            {/* Buttons Placeholder */}
            <div className="flex gap-6 mt-6">
              {/* Add CTA buttons here if needed */}
            </div>
          </div>

          {/* Right Section Placeholder */}
          {/* Add image, course preview or video later */}
        </main>
      </div>

      {/* Form Section */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-300 to-purple-400 py-10 px-4">
        <div className="w-full max-w-4xl mx-auto">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdwyHaW5JiGwNAfwxVpmHY5fUVv0YjCHdmh7_dpm5IMW7sHbw/viewform?embedded=true"
            width="100%"
            height="2021"
            className="bg-white shadow-lg rounded-lg w-full"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </>
  );
};

export default WebPage;
