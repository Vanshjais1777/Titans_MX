import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaReact, FaJava } from "react-icons/fa"; // Importing some example icons
import { useNavigate } from "react-router-dom";
import counsellorimg from "../assets/img1.jpg";
const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex justify-center p-4 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Icon Section (instead of Cover Image) */}
        <div className="p-6 text-white flex justify-between items-center bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600">
          <div className="flex items-center gap-4">
            <FaGithub className="text-3xl cursor-pointer hover:text-gray-200 transition ease-in-out duration-200" />
            <FaLinkedin className="text-3xl cursor-pointer hover:text-gray-200 transition ease-in-out duration-200" />
            <FaTwitter className="text-3xl cursor-pointer hover:text-gray-200 transition ease-in-out duration-200" />
          </div>
          <div className="text-center">
            <p className="text-lg">Tech Internships</p>
            <p className="text-xl font-semibold">Jane Smith</p>
            <p className="text-sm">New York, USA</p>
          </div>
        </div>

        {/* Profile Picture Section */}
        <div className="relative -mt-16 flex justify-center">
          <img
            src={counsellorimg} // Using the passed image prop
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
          />
        </div>

        {/* Profile Content */}
        <div className="px-6 pb-6">
          <div className="mt-16">
            <h1 className="text-3xl font-bold text-gray-900">Jane Smith</h1>
            <p className="text-gray-700 mt-2">
              Tech Internships | Passionate about software development and innovation.
            </p>
            <p className="mt-2 text-gray-500">{`Location: New York`}</p>
          </div>

          {/* Skills Section with Icons */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800">Skills & Technologies</h2>
            <div className="flex gap-6 mt-4">
              <FaReact className="text-4xl text-blue-500 cursor-pointer hover:text-blue-700 transition ease-in-out duration-200" />
              <FaJava className="text-4xl text-yellow-600 cursor-pointer hover:text-yellow-800 transition ease-in-out duration-200" />
              {/* Add more icons as needed */}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button onClick={()=>navigate("/chat")} className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition ease-in-out duration-200">
          Message
        </button>
        <button className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition ease-in-out duration-200">
          More
        </button>
      </div>
    </div>
      </div >
    </div >
  );
};

export default Profile;