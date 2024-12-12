import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import useAuth
import loginImg from "../../assets/LoginImg.gif";
import Header from "../../components/Header";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("employee"); // Track selected role
  const navigate = useNavigate();
  const { login } = useAuth(); // Using login from AuthContext

  const handleUserLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/user/login`,
        {
          identifier: email,
          password,
          role: selectedRole
        }
      );

      const { token } = response.data;

      if (token) {
        // Decode token to extract user information
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role; // Assuming role is in the token payload

        // Save token and user info to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", userRole);

        // Log the user in and set the role in context
        login(token);
        navigate("/");
      } else {
        throw new Error("Invalid token received");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = () => {
    navigate("/send-request"); // Navigate to the SendRequest route
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-green-100">
      <Header />
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-black relative top-10">
        {/* Left Section */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl text-green-600 font-bold mb-2">Welcome Back</h1>
          <p className="text-black text-sm mb-6">
            Build skills for today, tomorrow, and beyond. <br />
            <span className="italic text-black">Education to future-proof your career.</span>
          </p>

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleUserLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="mt-1 w-full px-4 py-2 bg-gray-200 text-black rounded-md placeholder:text-gray-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="mt-1 w-full px-4 py-2 bg-gray-200 text-black rounded-md placeholder:text-gray-500"
                required
              />
              <Link to={"/user/reset-pass"} className="text-sm text-blue-400 hover:underline float-right mt-1">
                Forget Password
              </Link>
            </div>
            <button
              type="submit"
              className={`w-full py-2 px-4 ${loading ? "bg-gray-500" : "bg-green-600 hover:bg-yellow-600"} text-black font-semibold rounded-md focus:ring focus:ring-yellow-400`}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Error Message */}
          {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/user/signup" className="text-green-600 font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

          {/* Are you a Job Provider Section */}
          <div className="mt-6 text-center">
            <h2 className="text-lg text-black font-medium">Are you a Job Provider?</h2>
            <button
              onClick={handleSendRequest}
              className="mt-2 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Send Request
            </button>
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="hidden md:block">
          <img src={loginImg} alt="Person with Tablet" className="rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
