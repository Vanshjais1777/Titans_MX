import React, { useState, useEffect } from "react";
import {
  FaSignInAlt,
  FaUserPlus,
  FaUserCircle,
  FaCommentAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SkillSphereLogo from "../assets/Logo.jpeg";

const Header = () => {
  const { isLoggedIn, login, logout, role } = useAuth();
  const [activePage, setActivePage] = useState("Home");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".relative")) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const navigateTo = (page) => {
    switch (page) {
      case "Home":
        navigate("/"); // Home page
        break;

      case "Opportunities":
        // Navigate based on role
        if (role === "employer") {
          navigate("/employer/opportunities"); // Employer-specific opportunities
        } else if (role === "employee") {
          navigate("/employee/opportunities"); // Employee-specific opportunities
        } else if (role === "govt") {
          navigate("/govt/jobs"); // Govt-specific opportunities
        }
        break;

      case "Training":
        // Navigate based on role
        if (role === "employer") {
          navigate("/employer/trainings"); // Employer-specific training
        } else if (role === "employee") {
          navigate("/employee/trainings"); // Employee-specific training
        } else if (role === "govt") {
          navigate("/govt/trainings"); // Govt-specific training
        }
        break;

      case "Certifications":
        // Navigate based on role
        if (role === "employer") {
          navigate("/employer/certifications"); // Employer-specific certifications
        } else if (role === "employee") {
          navigate("/employee/certifications"); // Employee-specific certifications
        } else if (role === "govt") {
          navigate("/govt/certifications"); // Govt-specific certifications
        }
        break;

      case "Counselling":
        // Navigate based on role
        if (role === "employer") {
          navigate("/employer/counselling"); // Employer-specific counselling
        } else if (role === "employee") {
          navigate("/employee/counselling"); // Employee-specific counselling
        } else if (role === "govt") {
          navigate("/govt/counselling"); // Govt-specific counselling
        }
        break;

      case "Chat":
        navigate("/chat"); // Chat page, applicable to all roles
        break;

      default:
        break;
    }
  };


  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-lg z-50 border-b border-gray-200 h-20">
      <div className="max-w-8xl mx-auto flex items-center justify-between px-4 md:px-10 h-full relative">
        {/* Left Section - Logo */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => {
            setActivePage("Home");
            navigateTo("Home");
          }}
        >
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden">
            <img
              src={SkillSphereLogo}
              alt="Skill Sphere Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-lg md:text-2xl font-bold text-green-700">
            Skill Sphere
          </span>
        </div>

        {/* Center Section - Navbar Links */}
        <nav className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
          {["Home", "Opportunities", "Training", "Certifications", "Counselling"].map(
            (item) => (
              <button
                key={item}
                className={`text-lg font-medium hover:text-green-600 transition-colors ${activePage === item ? "text-green-600 font-semibold" : "text-gray-800"
                  }`}
                onClick={() => {
                  setActivePage(item);
                  navigateTo(item);
                }}
              >
                {item}
              </button>
            )
          )}

        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-800 text-2xl focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {mobileMenuVisible ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        {mobileMenuVisible && (
          <div className="absolute top-20 left-0 w-full bg-white shadow-md border-t border-gray-200 flex flex-col items-start space-y-4 px-4 py-6 md:hidden">
            {["Home", "Opportunities", "Training", "Certifications", "Counselling"].map(
              (item) => (
                <button
                  key={item}
                  className="text-lg font-medium text-gray-800 hover:text-green-600 w-full text-left"
                  onClick={() => {
                    setActivePage(item);
                    navigateTo(item);
                    setMobileMenuVisible(false);
                  }}
                >
                  {item}
                </button>
              )
            )}
          </div>
        )}

        {/* Right Section */}
        <div className="relative flex items-center space-x-6 ml-auto">
          <button
            className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-500 cursor-pointer transition-all duration-300"
            onClick={() => {
              setActivePage("Chat");
              navigateTo("Chat");
            }}
          >
            <FaCommentAlt className="text-md" />
          </button>

          {isLoggedIn ? (
            <>
              <button
                className="flex items-center space-x-2 text-gray-800 hover:text-green-600"
                onClick={() => setDropdownVisible(!dropdownVisible)}
              >
                <FaUserCircle className="text-5xl" />
              </button>

              {dropdownVisible && (
                <div className="absolute right-0 top-9 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => {
                      setDropdownVisible(false);
                      navigate(`/${role}/profile`);
                    }}
                  >
                    My Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex space-x-3 ml-4">
              <button
                className="flex items-center bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                onClick={() => navigate("/user/login")}
              >
                <FaSignInAlt className="mr-2" />
                <span>Sign In</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
