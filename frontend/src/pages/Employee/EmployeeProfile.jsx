import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeSidebar from "../../components/EmployeeSidebar";

const EmployeeProfile = () => {
    const [formData, setFormData] = useState({
        userId: "",
        profilePicture: null,
        headline: "",
        bio: "",
        email: "",
        phone: "",
        location: {
            city: "",
            state: "",
            country: "",
            postalCode: "",
            addressLine1: "",
            addressLine2: "",
        },
        availability: "",
        educationBackground: "",
        skills: [],
        experience: "",
        careerGoals: "",
        resume: null,
        portfolioLink: "",
        languages: [],
        contact: "",
        coin: {
            amount: 0,
            transaction: [],
        },
        experienceDetails: [],
        education: [],
    });

    const [isEditable, setIsEditable] = useState(false);
    const [isProfileSaved, setIsProfileSaved] = useState(false);
    const [isDataChanged, setIsDataChanged] = useState(false);
    const [isNewProfile, setIsNewProfile] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/profile/employee/get-employee`,
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    }
                );
                if (response.data.data) {
                    setFormData(response.data.data);
                    setIsProfileSaved(true);
                    setIsEditable(false);
                    setIsNewProfile(false);
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfileData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "skills" || name === "languages") {
            setFormData({
                ...formData,
                [name]: value.split(",").map((item) => item.trim()),
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
        setIsDataChanged(true);
    };

    const handleNestedChange = (e, section, fieldName) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            [section]: {
                ...formData[section],
                [fieldName]: value,
            },
        });
        setIsDataChanged(true);
    };

    const handleArrayChange = (e, index, section) => {
        const { name, value } = e.target;
        const updatedSection = [...formData[section]];
        updatedSection[index][name] = value;
        setFormData({ ...formData, [section]: updatedSection });
        setIsDataChanged(true);
    };

    const addNewArrayEntry = (section) => {
        if (section === "experienceDetails") {
            setFormData({
                ...formData,
                experienceDetails: [
                    ...formData.experienceDetails,
                    { company: "", position: "", startDate: "", endDate: "", description: "" },
                ],
            });
        } else if (section === "education") {
            setFormData({
                ...formData,
                education: [
                    ...formData.education,
                    { institution: "", degree: "", startDate: "", endDate: "", description: "" },
                ],
            });
        }
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        setFormData({
            ...formData,
            [name]: e.target.files[0],
        });
        setIsDataChanged(true);
    };

    const handleSaveProfile = async () => {
        try {
            const url = isNewProfile
                ? `${import.meta.env.VITE_BACKEND_URL}/api/profile/employee`
                : `${import.meta.env.VITE_BACKEND_URL}/api/profile/employee/update-employee`;

            const formDataObj = new FormData();

            Object.keys(formData).forEach((key) => {
                if (key === "profilePicture" && formData.profilePicture) {
                    formDataObj.append("profilePicture", formData.profilePicture);
                } else if (key === "resume" && formData.resume) {
                    formDataObj.append("resume", formData.resume);
                } else if (Array.isArray(formData[key])) {
                    formDataObj.append(key, JSON.stringify(formData[key]));
                } else if (typeof formData[key] === "object") {
                    formDataObj.append(key, JSON.stringify(formData[key]));
                } else {
                    formDataObj.append(key, formData[key]);
                }
            });

            await axios.post(url, formDataObj, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            alert(isNewProfile ? "Profile created successfully!" : "Profile updated successfully!");
            setIsProfileSaved(true);
            setIsEditable(false);
            setIsDataChanged(false);
            setIsNewProfile(false);
        } catch (error) {
            console.error("Error saving/updating profile:", error);
            alert("Failed to save or update profile.");
        }
    };

    const handleEditProfile = () => {
        setIsEditable(true);
        setIsDataChanged(false);
    };

    return (
        <div className="h-screen flex">
            {/* Sidebar */}
            <div className="w-72 bg-white border-r">
                <EmployeeSidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-6">Employee Profile</h2>

                    {/* Headline */}
                    <input
                        type="text"
                        name="headline"
                        placeholder="Headline"
                        value={formData.headline}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                        className="border rounded p-3 w-full mb-4"
                    />

                    {/* Bio */}
                    <textarea
                        name="bio"
                        placeholder="Bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                        className="border rounded p-3 w-full mb-4"
                    />

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                        className="border rounded p-3 w-full mb-4"
                    />

                    {/* Phone */}
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                        className="border rounded p-3 w-full mb-4"
                    />

                    {/* Location */}
                    <div>
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.location.city}
                            onChange={(e) => handleNestedChange(e, "location", "city")}
                            disabled={!isEditable}
                            className="border rounded p-3 w-full mb-4"
                        />
                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            value={formData.location.state}
                            onChange={(e) => handleNestedChange(e, "location", "state")}
                            disabled={!isEditable}
                            className="border rounded p-3 w-full mb-4"
                        />
                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={formData.location.country}
                            onChange={(e) => handleNestedChange(e, "location", "country")}
                            disabled={!isEditable}
                            className="border rounded p-3 w-full mb-4"
                        />
                        <input
                            type="text"
                            name="postalCode"
                            placeholder="Postal Code"
                            value={formData.location.postalCode}
                            onChange={(e) => handleNestedChange(e, "location", "postalCode")}
                            disabled={!isEditable}
                            className="border rounded p-3 w-full mb-4"
                        />
                        <input
                            type="text"
                            name="addressLine1"
                            placeholder="Address Line 1"
                            value={formData.location.addressLine1}
                            onChange={(e) => handleNestedChange(e, "location", "addressLine1")}
                            disabled={!isEditable}
                            className="border rounded p-3 w-full mb-4"
                        />
                        <input
                            type="text"
                            name="addressLine2"
                            placeholder="Address Line 2"
                            value={formData.location.addressLine2}
                            onChange={(e) => handleNestedChange(e, "location", "addressLine2")}
                            disabled={!isEditable}
                            className="border rounded p-3 w-full mb-4"
                        />
                    </div>

                    {/* Other fields */}
                    {/* Availability, Education Background, Skills, Career Goals, Resume, Portfolio Link, Languages, Contact, Coin Amount */}

                    <button
                        onClick={isEditable ? handleSaveProfile : handleEditProfile}
                        className="bg-blue-500 text-white p-3 rounded"
                    >
                        {isEditable ? "Save Profile" : "Edit Profile"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfile;
