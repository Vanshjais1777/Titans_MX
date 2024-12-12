import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import signupImg from "../../assets/SignupImg.jpg"; // Replace with any image you want to use

const AdminLogin = () => {
    const [adminKey, setAdminKey] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/auth/admin/login', {
                adminKey,
            });

            const { token, admin } = response.data;

            // Save token and admin info to localStorage
            localStorage.setItem("adminToken", token);
            localStorage.setItem("admin", JSON.stringify(admin));

            // Redirect admin to dashboard or desired page

        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-green-100 h-screen">
            <div className="max-w-4xl bg-white rounded-lg shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-black m-10">
                {/* Left Section */}
                <div className="text-black flex flex-col justify-center">
                    <h1 className="text-4xl text-green-600 font-bold mb-2">Admin Login</h1>
                    <p className="text-black text-sm mb-16">
                        Enter your 16-character admin key to access the admin dashboard. <br />
                        <span className="italic text-black">Let's manage things smoothly.</span>
                    </p>
                    <form className="space-y-4" onSubmit={handleAdminLogin}>
                        <div>
                            <label htmlFor="adminKey" className="block text-sm font-medium text-black">
                                Admin Key
                            </label>
                            <input
                                type="text"
                                id="adminKey"
                                value={adminKey}
                                onChange={(e) => setAdminKey(e.target.value)}
                                placeholder="Enter admin key"
                                className="mt-1 w-full px-4 py-2 bg-gray-200 text-black rounded-md placeholder:text-gray-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full py-2 px-4 ${loading ? "bg-gray-500" : "bg-green-600 hover:bg-yellow-600"} text-white font-semibold rounded-md focus:ring`}
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                    {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
                </div>

                {/* Right Section */}
                <div className="hidden md:flex md:justify-center md:items-center">
                    <img
                        src={signupImg}
                        alt="Signup illustration"
                        className="rounded-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
