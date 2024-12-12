import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";  // Assuming useAuth is the context hook for authentication
import EmployerSidebar from "../../components/EmployerSidebar";
import GovtSidebar from "../../components/GovtSidebar"; // Assuming GovtSidebar exists
import EmployeeSidebar from "../../components/EmployeeSidebar"; // Assuming EmployeeSidebar exists

const UpdateProfile = () => {
    const { role } = useAuth(); // Assuming 'user' contains the role info
    const [formData, setFormData] = useState({
        companyName: "",
        companyLogo: null,
        companyDescription: "",
        website: "",
        industry: "",
        location: "",
        companyEmail: "",
    });

    const [isEditable, setIsEditable] = useState(true); // Initially editable for first time fill
    const [isProfileSaved, setIsProfileSaved] = useState(false);
    const [isDataChanged, setIsDataChanged] = useState(false);

    const [isNewProfile, setIsNewProfile] = useState(true); // To distinguish between new profile and update

    // Fetch employer profile data
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/profile/employer/get-employer`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.data.data) {
                    setFormData(response.data.data);
                    setIsProfileSaved(true); // Mark profile as saved when data is fetched
                    setIsEditable(false); // Make the fields non-editable once the profile is fetched
                    setIsNewProfile(false); // It's not a new profile
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfileData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setIsDataChanged(true); // Track data change
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        setFormData({
            ...formData,
            [name]: e.target.files[0],
        });
        setIsDataChanged(true); // Track file change
    };

    const handleSaveProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const data = new FormData();
            for (let key in formData) {
                if (formData[key]) {
                    data.append(key, formData[key]);
                }
            }

            const url = isNewProfile
                ? `${import.meta.env.VITE_BACKEND_URL}/api/profile/employer`
                : `${import.meta.env.VITE_BACKEND_URL}/api/profile/employer/update-employer`;

            await axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            alert(isNewProfile ? "Profile created successfully!" : "Profile updated successfully!");
            setIsProfileSaved(true); // Profile saved successfully
            setIsEditable(false); // Switch to non-editable mode
            setIsDataChanged(false); // Reset data change tracking
            setIsNewProfile(false); // It's no longer a new profile after saving or updating
        } catch (error) {
            console.error("Error saving/updating profile:", error);
            alert("Failed to save or update profile.");
        }
    };

    const handleEditProfile = () => {
        setIsEditable(true); // Switch to editable mode
        setIsDataChanged(false); // Reset data change tracking when editing starts
    };

    // Conditional rendering of sidebar based on user role
    const renderSidebar = () => {
        if (!role) {
            return <div>Error: User role not found</div>; // Handle unexpected cases
        }

        switch (role.toLowerCase()) { // Ensure case-insensitive matching
            case "govt":
                return <GovtSidebar />;
            case "employee":
                return <EmployeeSidebar />;
            case "employer":
                return <EmployerSidebar />;
            default:
                return <div>Role not recognized</div>; // Handle unknown roles explicitly
        }
    };


    return (
        <div className="bg-gray-100 h-screen flex">
            {renderSidebar()}

            <div className="flex-1 p-6 overflow-y-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <section className="mb-6">
                        <h2 className="text-xl font-semibold mb-4">Basic Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                name="companyName"
                                placeholder="Company Name"
                                value={formData.companyName || ""}
                                onChange={handleInputChange}
                                disabled={!isEditable}
                                className="border rounded p-3 w-full"
                            />
                            <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                value={formData.location || ""}
                                onChange={handleInputChange}
                                disabled={!isEditable}
                                className="border rounded p-3 w-full"
                            />
                            <textarea
                                name="companyDescription"
                                placeholder="Company Description"
                                value={formData.companyDescription || ""}
                                onChange={handleInputChange}
                                disabled={!isEditable}
                                className="border rounded p-3 w-full"
                            />
                            <input
                                type="url"
                                name="website"
                                placeholder="Website URL"
                                value={formData.website || ""}
                                onChange={handleInputChange}
                                disabled={!isEditable}
                                className="border rounded p-3 w-full"
                            />
                            <select
                                name="industry"
                                value={formData.industry || ""}
                                onChange={handleInputChange}
                                disabled={!isEditable}
                                className="border rounded p-3 w-full"
                            >
                                <option value="">Select Industry</option>
                                <option value="Tech">Tech</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Finance">Finance</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Education">Education</option>
                                <option value="Other">Other</option>
                            </select>
                            <input
                                type="file"
                                name="companyLogo"
                                onChange={handleFileChange}
                                disabled={!isEditable}
                                className="border rounded p-3 w-full"
                            />
                        </div>
                    </section>

                    <div className="mt-10 flex space-x-4">
                        <button
                            onClick={handleSaveProfile}
                            className="bg-green-500 text-white px-6 py-2 rounded-lg"
                            disabled={!isEditable || !isDataChanged}
                        >
                            {isNewProfile ? "Save Profile" : "Update Profile"}
                        </button>

                        {isProfileSaved && !isEditable && (
                            <button
                                onClick={handleEditProfile}
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
