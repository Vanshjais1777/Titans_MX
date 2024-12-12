import React, { useState, useContext } from "react";
import EmployerSidebar from "../../components/EmployerSidebar";
import { useAuth } from "../../context/AuthContext"; // Assuming your AuthContext is in this path
import GovtSidebar from '../../components/GovtSidebar'; // Assuming you have this component
import EmployeeSidebar from '../../components/EmployeeSidebar'; // Assuming you have this component

function EmployerPostJobs() {
    const [area, setArea] = useState("Government");

    const [jobDetails, setJobDetails] = useState({
        title: "",
        description: "",
        area,
        category: "Web Development",
        subCategory: "",
        budget: 0,
        budgetType: "Hourly",
        skillsRequired: "",
        experienceLevel: "Beginner",
        duration: "Short-term",
        startDate: "",
        endDate: "",
        location: {
            address: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
            remote: false
        },
        isUrgent: false,
        isFeatured: false,
        attachments: [],
        status: "Active",
        rating: 0,
    });

    // Get the user's role from AuthContext
    const { role } = useAuth();
    if (role == "employer") {
        setArea("Private");
    }
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setJobDetails({
                ...jobDetails,
                [name]: checked
            });
        } else if (name.includes("location")) {
            const locationField = name.split(".")[1];
            setJobDetails({
                ...jobDetails,
                location: { ...jobDetails.location, [locationField]: value }
            });
        } else {
            setJobDetails({
                ...jobDetails,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct the job data from form state
        const jobData = {
            title: jobDetails.title.trim(),
            description: jobDetails.description.trim(),
            category: jobDetails.category,
            subCategory: jobDetails.subCategory || null,
            budget: parseFloat(jobDetails.budget),
            budgetType: jobDetails.budgetType,
            skillsRequired: jobDetails.skillsRequired.split(',').map(skill => skill.trim()),
            experienceLevel: jobDetails.experienceLevel,
            duration: jobDetails.duration,
            startDate: jobDetails.startDate || null,
            endDate: jobDetails.endDate || null,
            location: {
                address: jobDetails.location.address.trim(),
                city: jobDetails.location.city.trim(),
                state: jobDetails.location.state.trim(),
                postalCode: jobDetails.location.postalCode.trim(),
                country: jobDetails.location.country.trim(),
                remote: jobDetails.location.remote,
            },
            isUrgent: jobDetails.isUrgent,
            isFeatured: jobDetails.isFeatured,
            attachments: jobDetails.attachments.length ? jobDetails.attachments : [],
            status: "Active",
            rating: 0,
            area,
        };

        // Send POST request to the API
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/job/create-job`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(jobData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Job created successfully:", data);
                alert("job posted")
                // Redirect or show success message
            } else {
                const errorData = await response.json();
                alert("error in posting job");
                console.error("Error creating job:", errorData);
                // Show error message to the user
            }
        } catch (error) {
            console.error("Network error:", error);
            // Handle network error
        }
    };

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
        <div className="flex bg-gray-100 h-screen">
            {renderSidebar()}
            <div className="min-h-screen bg-gray-100 p-1 overflow-y-auto w-screen">
                <div className=" mx-auto bg-white shadow-md rounded-lg p-8">
                    <h1 className="text-2xl font-bold mb-6">Post Jobs</h1>

                    {/* Job Title */}
                    <div className="mb-6">
                        <label className="block font-medium mb-2">Job Title</label>
                        <input
                            type="text"
                            name="title"
                            value={jobDetails.title}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            placeholder="Enter job title"
                        />
                    </div>

                    {/* Job Description */}
                    <div className="mb-6">
                        <label className="block font-medium mb-2">Job Description</label>
                        <textarea
                            rows="5"
                            name="description"
                            value={jobDetails.description}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            placeholder="Enter job description"
                        />
                    </div>

                    {/* Category */}
                    <div className="mb-6">
                        <label className="block font-medium mb-2">Job Category</label>
                        <select
                            name="category"
                            value={jobDetails.category}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                        >
                            <option>Web Development</option>
                            <option>Graphic Design</option>
                            <option>Content Writing</option>
                            <option>SEO</option>
                            <option>App Development</option>
                            <option>Marketing</option>
                            <option>Other</option>
                        </select>
                    </div>

                    {/* Subcategory */}
                    <div className="mb-6">
                        <label className="block font-medium mb-2">Subcategory (Optional)</label>
                        <input
                            type="text"
                            name="subCategory"
                            value={jobDetails.subCategory}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            placeholder="Enter subcategory"
                        />
                    </div>

                    {/* Budget */}
                    <div className="mb-6">
                        <label className="block font-medium mb-2">Budget</label>
                        <input
                            type="number"
                            name="budget"
                            value={jobDetails.budget}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            placeholder="Enter budget"
                        />
                    </div>

                    {/* Budget Type */}
                    <div className="mb-6">
                        <label className="block font-medium mb-2">Budget Type</label>
                        <select
                            name="budgetType"
                            value={jobDetails.budgetType}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                        >
                            <option>Hourly</option>
                            <option>Fixed</option>
                        </select>
                    </div>

                    {/* Skills Required */}
                    <div className="mb-6">
                        <label className="block font-medium mb-2">Skills (Use Commas)</label>
                        <input
                            type="text"
                            name="skillsRequired"
                            value={jobDetails.skillsRequired}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            placeholder="Enter skills"
                        />
                    </div>

                    {/* Experience Level */}
                    <div className="mb-6">
                        <label className="block font-medium mb-2">Experience Level</label>
                        <select
                            name="experienceLevel"
                            value={jobDetails.experienceLevel}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                        >
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Expert</option>
                        </select>
                    </div>

                    {/* Job Duration */}
                    <div className="mb-6">
                        <label className="block font-medium mb-2">Job Duration</label>
                        <select
                            name="duration"
                            value={jobDetails.duration}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                        >
                            <option>Short-term</option>
                            <option>Long-term</option>
                            <option>Ongoing</option>
                        </select>
                    </div>

                    {/* Start and End Date */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block font-medium mb-2">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={jobDetails.startDate}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-2">End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={jobDetails.endDate}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div className="mb-6">
                        <label className="block font-medium mb-2">Location</label>
                        <input
                            type="text"
                            name="location.address"
                            value={jobDetails.location.address}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            placeholder="Enter address"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block font-medium mb-2">City</label>
                            <input
                                type="text"
                                name="location.city"
                                value={jobDetails.location.city}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg"
                                placeholder="Enter city"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-2">State</label>
                            <input
                                type="text"
                                name="location.state"
                                value={jobDetails.location.state}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg"
                                placeholder="Enter state"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block font-medium mb-2">Postal Code</label>
                            <input
                                type="text"
                                name="location.postalCode"
                                value={jobDetails.location.postalCode}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg"
                                placeholder="Enter postal code"
                            />
                        </div>
                        <div>
                            <label className="block font-medium mb-2">Country</label>
                            <input
                                type="text"
                                name="location.country"
                                value={jobDetails.location.country}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-lg"
                                placeholder="Enter country"
                            />
                        </div>
                    </div>

                    {/* Remote Checkbox */}
                    <div className="mb-6">
                        <input
                            type="checkbox"
                            name="location.remote"
                            checked={jobDetails.location.remote}
                            onChange={handleChange}
                            className="mr-2 p-3 border rounded-lg mt-3"
                        />
                        <label className="font-medium mb-2">Remote</label>
                    </div>

                    {/* Urgent Checkbox */}
                    <div className="mb-6">
                        <input
                            type="checkbox"
                            name="isUrgent"
                            checked={jobDetails.isUrgent}
                            onChange={handleChange}
                            className="mr-2 p-3 border rounded-lg mt-3"
                        />
                        <label className="font-medium mb-2">Urgent</label>
                    </div>

                    {/* Featured Checkbox */}
                    <div className="mb-6">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            checked={jobDetails.isFeatured}
                            onChange={handleChange}
                            className="mr-2 p-3 border rounded-lg mt-3"
                        />
                        <label className="font-medium mb-2">Featured</label>
                    </div>

                    {/* Submit Button */}
                    <div className="mb-6">
                        <button
                            onClick={handleSubmit}
                            className="w-full p-3 bg-blue-500 text-white rounded-lg"
                        >
                            Post Job
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployerPostJobs;
