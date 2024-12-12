import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";

const SendRequest = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/request/new-request",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage("Request sent to government for approval.");
        setError("");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          companyName: "",
        });
        // Call acceptRequest API after successful submission
        acceptRequest(formData.email);
      } else {
        setMessage("");
        setError("An error occurred while sending request to government.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("");
      setError("An error occurred while sending request to government.");
    }
  };

  const acceptRequest = async (email) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/request/accept-request",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage("Request accepted successfully.");
        setError("");
      } else {
        setMessage("");
        setError("Failed to accept the request.");
      }
    } catch (error) {
      console.error("Error accepting request:", error);
      setMessage("");
      setError("An error occurred while accepting the request.");
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Send a Request</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-gray-700 font-medium">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-gray-700 font-medium">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium">
                Email ID
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email ID"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mobileNumber" className="block text-gray-700 font-medium">
                Mobile Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="companyName" className="block text-gray-700 font-medium">
                Organization Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter your organization name"
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 text-white font-bold rounded-md hover:bg-purple-500"
            >
              Submit
            </button>
            {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
            {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default SendRequest;
