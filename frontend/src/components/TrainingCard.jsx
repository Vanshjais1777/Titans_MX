import React from "react";
import { useNavigate } from "react-router-dom";

const TrainingCard = ({
  title,
  description,
  category,
  level,
  language,
  fee,
  isPaid,
  thumbnail,
  instructor,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden" onClick={() => navigate("/employee/single-training")}>
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
        <div className="mt-4">
          <span className="text-sm text-green-700 font-medium">{category}</span>
          <span className="text-sm text-gray-500 ml-2">| {level}</span>
        </div>
        <div className="mt-2">
          <span className="text-sm text-gray-500">{language}</span>
        </div>
        <div className="mt-4">
          <p className="text-lg text-green-700 font-semibold">
            {isPaid ? `₹${fee}` : "Free"}
          </p>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          <p>Instructor: {instructor}</p>
        </div>
      </div>
    </div>
  );
};

export default TrainingCard;
