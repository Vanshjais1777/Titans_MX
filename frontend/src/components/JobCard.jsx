import React from "react";

const JobCard = ({ title, company, applicants, postedDate, expiryDate }) => {
    return (
        <div className="bg-white shadow-md rounded-md p-4 flex justify-between items-center mb-4">
            <div className="flex items-center">
                <img
                    src="https://via.placeholder.com/40"
                    alt="company logo"
                    className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-sm text-gray-600">{company}</p>
                </div>
            </div>
            <div className="text-center">
                <button className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600">
                    {applicants} Applicants
                </button>
            </div>
            <div className="text-right text-sm text-gray-500">
                <p>Posted: {postedDate}</p>
                <p>Expired: {expiryDate}</p>
            </div>
            <div className="flex space-x-2">
                <button className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600">
                    Edit
                </button>
                <button className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default JobCard;
