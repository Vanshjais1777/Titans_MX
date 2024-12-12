import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import signupImg from "../../assets/SignupImg.gif";
import Header from "../../components/Header";

const UserSignup = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("employee");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleUserSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/auth/user/signup",
        {
          firstName,
          lastName,
          username,
          email,
          phoneNumber,
          location,
          role,
          password,
          isStudent,
        }
      );

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      login(token);
      navigate("/");
    } catch (err) {
      if (err.response?.status === 400) {
        setError(err.response?.data?.message || "Bad request. Please check your input.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-green-100 min-h-screen">
      <Header />
      <div className="max-w-5xl bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-black m-10 relative top-16">
        {/* Left Section */}
        <div className="hidden md:flex md:justify-center md:items-center">
          <img src={signupImg} alt="Signup illustration" className="rounded-md max-h-96" />
        </div>

        <div className="text-black flex flex-col justify-center">
          <h1 className="text-2xl text-green-600 font-bold mb-4 text-center">Create an Account</h1>
          <form className="grid grid-cols-2 gap-4" onSubmit={handleUserSignup}>
            <div className="col-span-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-black">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                placeholder="Enter your first name"
                className="mt-1 w-full px-4 py-2 bg-gray-200 text-black rounded-md placeholder:text-gray-500"
                required
              />
            </div>

            <div className="col-span-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-black">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                placeholder="Enter your last name"
                className="mt-1 w-full px-4 py-2 bg-gray-200 text-black rounded-md placeholder:text-gray-500"
                required
              />
            </div>

            <div className="col-span-2">
              <label htmlFor="username" className="block text-sm font-medium text-black">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter a username"
                className="mt-1 w-full px-4 py-2 bg-gray-200 text-black rounded-md placeholder:text-gray-500"
                required
              />
            </div>

            <div className="col-span-2">
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
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-black">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone number"
                className="mt-1 w-full px-4 py-2 bg-gray-200 text-black rounded-md placeholder:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-black">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="mt-1 w-full px-4 py-2 bg-gray-200 text-black rounded-md placeholder:text-gray-500"
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
                placeholder="Password"
                className="mt-1 w-full px-4 py-2 bg-gray-200 text-black rounded-md placeholder:text-gray-500"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="mt-1 w-full px-4 py-2 bg-gray-200 text-black rounded-md placeholder:text-gray-500"
                required
              />
            </div>

            <div className="col-span-2">
              <label htmlFor="isStudent" className="block text-sm font-medium text-black">
                Are you a student?
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isStudent"
                  checked={isStudent}
                  onChange={(e) => setIsStudent(e.target.checked)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-sm text-black">Yes</span>
              </div>
            </div>

            <button
              type="submit"
              className={`col-span-2 py-2 px-4 ${loading ? "bg-gray-500" : "bg-green-600 hover:bg-yellow-600"} text-black font-semibold rounded-md focus:ring`}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          {error && <p className="mt-4 text-red-500 text-sm text-center col-span-2">{error}</p>}

          <div className="mt-4 text-center col-span-2">
            <p className="text-sm text-gray-500">
              Already have an account? {" "}
              <Link to="/user/login" className="text-green-600 font-medium hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
