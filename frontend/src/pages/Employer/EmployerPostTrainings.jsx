import React, { useState } from 'react';
import EmployerSidebar from '../../components/EmployerSidebar';
import { useAuth } from '../../context/AuthContext'; // Make sure you have the useAuth context
import GovtSidebar from '../../components/GovtSidebar'; // Assuming you have this component
import EmployeeSidebar from '../../components/EmployeeSidebar'; // Assuming you have this component

const PostTraining = () => {
    const { role } = useAuth(); // Assuming useAuth provides role
    const [trainingDetails, setTrainingDetails] = useState({
        title: '',
        description: '',
        category: '',
        level: 'Beginner',
        language: '',
        thumbnail: 'temp',
        status: 'Published',
        instructor: 'John Doe',
        isPaid: false,
        fee: 5000,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTrainingDetails((prevDetails) => ({
            ...prevDetails,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/courses/createcourse`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(trainingDetails),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Training posted successfully!');
                setTrainingDetails({
                    userId: '',
                    title: '',
                    description: '',
                    category: '',
                    level: 'Beginner',
                    language: '',
                    thumbnail: '',
                    status: 'Published',
                    instructor: '',
                    isPaid: false,
                    fee: 0,
                });
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            alert('An error occurred while posting the training.');
            console.error(error);
        }
    };

    // Conditionally render the sidebar based on the role
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
        <div className='flex h-screen'>
            {renderSidebar()} {/* Render sidebar based on role */}
            <div className="container mx-auto p-6 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-6">Post Training</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-medium mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={trainingDetails.title}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            placeholder="Enter training title"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">Description</label>
                        <textarea
                            name="description"
                            value={trainingDetails.description}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            placeholder="Enter training description"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block font-medium mb-2">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={trainingDetails.category}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            placeholder="Enter training category"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">Level</label>
                        <select
                            name="level"
                            value={trainingDetails.level}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium mb-2">Language</label>
                        <input
                            type="text"
                            name="language"
                            value={trainingDetails.language}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            placeholder="Enter training language"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">Thumbnail URL</label>
                        <input
                            type="text"
                            name="thumbnail"
                            value={trainingDetails.thumbnail}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            placeholder="Enter thumbnail URL"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">Instructor Name</label>
                        <input
                            type="text"
                            name="instructor"
                            value={trainingDetails.instructor}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg"
                            placeholder="Enter instructor Name"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block font-medium mb-2">Is Paid</label>
                            <input
                                type="checkbox"
                                name="isPaid"
                                checked={trainingDetails.isPaid}
                                onChange={handleChange}
                                className="h-5 w-5"
                            />
                        </div>

                        {trainingDetails.isPaid && (
                            <div>
                                <label className="block font-medium mb-2">Fee</label>
                                <input
                                    type="number"
                                    name="fee"
                                    value={trainingDetails.fee}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg"
                                    placeholder="Enter fee amount"
                                />
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                    >
                        Post Training
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostTraining;
