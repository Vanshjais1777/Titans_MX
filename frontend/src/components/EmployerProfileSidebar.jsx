import React from "react";
import {
  FaTachometerAlt,
  FaUser,
  FaBriefcase,
  FaPlusCircle,
  FaUsers,
  FaCheckCircle,
  FaBox,
  FaEnvelope,
  FaLock,
  FaTrashAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-80 h-screen bg-gray-100 shadow-md">
      {/* Header Section */}
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-800">Government of Rajasthan</h1>
        <p className="text-base text-gray-500">📍 Rajasthan</p>
      </div>

      {/* Navigation Items */}
      <nav className="mt-8">
        <ul>
          <li className="hover:bg-green-100">
            <a
              href="#"
              className="flex items-center px-8 py-4 text-green-600 font-medium text-lg"
            >
              <FaTachometerAlt className="text-green-500 text-2xl mr-6" />
              User Dashboard
            </a>
          </li>
          <li className="hover:bg-gray-200">
            <a
              href="#"
              className="flex items-center px-8 py-4 text-gray-700 text-lg"
            >
              <FaUser className="text-blue-500 text-2xl mr-6" />
              User Profile
            </a>
          </li>
          <li className="hover:bg-gray-200">
            <a
              href="#"
              className="flex items-center px-8 py-4 text-gray-700 text-lg"
            >
              <FaBriefcase className="text-yellow-500 text-2xl mr-6" />
              My Jobs
            </a>
          </li>
          <li className="hover:bg-gray-200">
            <a
              href="#"
              className="flex items-center px-8 py-4 text-gray-700 text-lg"
            >
              <FaPlusCircle className="text-purple-500 text-2xl mr-6" />
              Submit Jobs
            </a>
          </li>
          <li className="hover:bg-gray-200">
            <a
              href="#"
              className="flex items-center px-8 py-4 text-gray-700 text-lg"
            >
              <FaUsers className="text-pink-500 text-2xl mr-6" />
              Applicants Jobs
            </a>
          </li>
          <li className="hover:bg-gray-200">
            <a
              href="#"
              className="flex items-center px-8 py-4 text-gray-700 text-lg"
            >
              <FaCheckCircle className="text-green-500 text-2xl mr-6" />
              Shortlisted Candidates
            </a>
          </li>
          <li className="hover:bg-gray-200">
            <a
              href="#"
              className="flex items-center px-8 py-4 text-gray-700 text-lg"
            >
              <FaBox className="text-orange-500 text-2xl mr-6" />
              Package
            </a>
          </li>
          <li className="hover:bg-gray-200">
            <a
              href="#"
              className="flex items-center px-8 py-4 text-gray-700 text-lg"
            >
              <FaEnvelope className="text-red-500 text-2xl mr-6" />
              Messages
            </a>
          </li>
          <li className="hover:bg-gray-200">
            <a
              href="#"
              className="flex items-center px-8 py-4 text-gray-700 text-lg"
            >
              <FaLock className="text-teal-500 text-2xl mr-6" />
              Change Password
            </a>
          </li>
          <li className="hover:bg-gray-200">
            <a
              href="#"
              className="flex items-center px-8 py-4 text-gray-700 text-lg"
            >
              <FaTrashAlt className="text-red-600 text-2xl mr-6" />
              Delete Account
            </a>
          </li>
          <li className="hover:bg-gray-200">
            <a
              href="#"
              className="flex items-center px-8 py-4 text-gray-700 text-lg"
            >
              <FaSignOutAlt className="text-gray-800 text-2xl mr-6" />
              Log Out
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
