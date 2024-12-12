import React from "react";
import EmployerSidebar from "../../components/EmployerSidebar";

function EmployerShortlistedCandidates() {
    const candidates = [
        {
            id: 1,
            name: "Kr. Dhananjay Preet",
            position: "Sr. Web Designer",
            location: "London",
            experience: "7 Years Exp.",
            skills: ["HTML", "CSS3", "Bootstrap", "Redux"],
            image: "https://via.placeholder.com/150",
        },
        {
            id: 2,
            name: "Clarence B. Mantooth",
            position: "Sr. Content Writer",
            location: "Canada, USA",
            experience: "3 Years Exp.",
            skills: ["HTML", "CSS3", "Bootstrap", "Redux"],
            image: "https://via.placeholder.com/150",
        },
        // Add more candidate objects here
    ];

    return (

        <div className="flex bg-gray-100 h-screen">
            <EmployerSidebar />
            <div className="min-h-screen bg-gray-100 p-2 overflow-y-auto w-screen">
                <div className="mx-auto bg-white p-8 shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold mb-6">Shortlisted Candidates</h1>

                    <div className="flex justify-between mb-8">
                        <input
                            type="text"
                            placeholder="Job title, Keywords etc."
                            className="w-2/3 p-3 border rounded-lg"
                        />
                        <button className="bg-green-500 text-white px-6 py-3 rounded-lg">
                            Search
                        </button>

                        <select className="p-3 border rounded-lg">
                            <option>Sort by (Default)</option>
                            <option>Experience</option>
                            <option>Location</option>
                        </select>
                    </div>

                    <div className="space-y-6">
                        {candidates.map((candidate) => (
                            <div
                                key={candidate.id}
                                className="bg-white p-4 shadow-md rounded-lg flex items-center"
                            >
                                <img
                                    src={candidate.image}
                                    alt="Candidate"
                                    className="w-16 h-16 rounded-full mr-6"
                                />
                                <div className="flex-grow">
                                    <h2 className="text-lg font-bold">{candidate.name}</h2>
                                    <p className="text-sm text-gray-600">
                                        {candidate.position} | {candidate.location}
                                    </p>
                                    <div className="mt-2 flex gap-2">
                                        {candidate.skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="text-xs bg-blue-200 text-blue-600 px-2 py-1 rounded-md"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-md">
                                        {candidate.experience}
                                    </span>
                                    <div className="flex space-x-3">
                                        <button className="bg-blue-100 p-2 rounded-md hover:bg-blue-200">
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <button className="bg-green-100 p-2 rounded-md hover:bg-green-200">
                                            <i className="fas fa-envelope"></i>
                                        </button>
                                        <button className="bg-red-100 p-2 rounded-md hover:bg-red-200">
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployerShortlistedCandidates;
