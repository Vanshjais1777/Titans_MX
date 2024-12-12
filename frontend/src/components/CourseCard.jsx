import React from 'react';

const CourseCard = ({ title, duration, rating, learners, image }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image Box */}
      <div className="w-full h-40 bg-gray-200">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-green-700">{title}</h2>
        <p className="text-green-600">{duration}</p>
        <p className="mt-2 text-green-600">⭐ {rating}</p>
        <p className="text-green-600">{learners} learners</p>
        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500">
          Know More
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
