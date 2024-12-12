import React, { useEffect, useState } from "react";
import EmployeeSidebar from "../../components/EmployeeSidebar";
import axios from "axios";

const EmployeeResume = () => {
    const [url, setUrl] = useState("");

    const uploadResume = () => {
        const token = localStorage.getItem("token");
        const fileInput = document.getElementById("resume");
        const file = fileInput?.files[0];

        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("resume", file);

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/resume/upload", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => {
                setUrl(import.meta.env.VITE_BACKEND_URL + "/" + response.data.resumePath);
                alert("Resume uploaded successfully.");
            })
            .catch((error) => {
                console.error(error);
                alert("Failed to upload resume.");
            });
    };

    const genResume = () => {
        const token = localStorage.getItem("token");

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/resume/generate", {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setUrl(import.meta.env.VITE_BACKEND_URL + "/" + response.data.resumelink);
                alert("Resume generated successfully.");
            })
            .catch((error) => {
                console.error(error);
                alert("Failed to generate resume.");
            });
    };

    const getResume = () => {
        const token = localStorage.getItem("token");

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/resume/getresume", {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setUrl(import.meta.env.VITE_BACKEND_URL + "/" + response.data);
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
                alert("Failed to retrieve resume.");
            });
    };

    useEffect(() => {
        getResume();
    }, [])

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <EmployeeSidebar />

            {/* Main content */}
            <div className="flex-1 h-screen overflow-y-auto bg-gray-50 p-6 ml-72">
                <div className="max-w-4xl mx-auto py-10 px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h1 className="text-2xl font-semibold text-gray-700 mb-6">Manage Your Resume</h1>

                        {/* File Upload Section */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-600 mb-4">Upload Resume</h2>
                            <input
                                type="file"
                                id="resume"
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-gray-700 file:bg-gray-50 hover:file:bg-gray-100"
                            />
                            <button
                                onClick={uploadResume}
                                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
                            >
                                Upload
                            </button>
                        </div>

                        {/* Generate Resume Section */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-600 mb-4">Generate Resume</h2>
                            <button
                                onClick={genResume}
                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
                            >
                                Generate
                            </button>
                        </div>

                        {/* Resume Preview */}
                        {url && (
                            <div className="mt-10">
                                <h2 className="text-lg font-semibold text-gray-600 mb-4">Preview</h2>
                                <iframe
                                    src={url}
                                    width="100%"
                                    height="500"
                                    className="border rounded-lg"
                                    title="Resume Preview"
                                ></iframe>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeResume;
