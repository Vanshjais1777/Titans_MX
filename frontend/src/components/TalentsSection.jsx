import React, { useState } from "react";
import Profile from "./Profile"; // Import the Profile component

const TalentSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedCounsellor, setSelectedCounsellor] = useState(null); // State to hold selected counsellor

  const counsellors = [
    {
      id: 1,
      name: "Jane Smith",
      category: "Tech Internships",
      location: "New York",
      image: "src/assets/img1.jpg",
    },
    {
      id: 2,
      name: "John Doe",
      category: "Business & Management",
      location: "San Francisco",
      image: "src/assets/img2.jpg",
    },
    {
      id: 3,
      name: "Emily Johnson",
      category: "Creative Fields",
      location: "India",
      image: "src/assets/img3.jpg",
    },
    {
      id: 4,
      name: "Michael Brown",
      category: "Tech Internships",
      location: "New York",
      image: "src/assets/img2.jpg",
    },
    {
      id: 5,
      name: "Sophia Wilson",
      category: "Business & Management",
      location: "India",
      image: "src/assets/img3.jpg",
    },
    {
      id: 6,
      name: "Liam Garcia",
      category: "Creative Fields",
      location: "India",
      image: "src/assets/img1.jpg",
    },
  ];
  const filteredCounsellors = counsellors.filter(
    (counsellor) =>
      (selectedCategory === "All" ||
        counsellor.category === selectedCategory) &&
      (selectedLocation === "All" || counsellor.location === selectedLocation)
  );

  return (
    <div className="bg-gray-50 min-h-screen font-sans mt-12">
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredCounsellors.map((counsellor) => (
              <div
                key={counsellor.id}
                className="bg-white shadow-md rounded-lg p-6 text-center">
                <img
                  src={counsellor.image}
                  alt={counsellor.name}
                  className="w-24 h-24 mx-auto rounded-full"
                />
                <h3 className="mt-4 text-xl font-bold">{counsellor.name}</h3>
                <p className="text-gray-500 mt-2">{counsellor.category}</p>
                <p className="text-gray-400">Location: {counsellor.location}</p>
                <button
                  onClick={() => setSelectedCounsellor(counsellor)}
                  className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditionally render the Profile Component */}
      {selectedCounsellor && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 w-[50vw] h-[50vw] rounded-lg relative mx-5 my-5">
            {/* Close Button */}
            <button
              onClick={() => setSelectedCounsellor(null)}
              className="fixed top-4 right-4 bg-gray-200 bg-opacity-50 rounded-full p-3 text-gray-700 hover:text-gray-900 hover:bg-opacity-100 transition duration-200">
              ✖
            </button>
            <Profile counsellor={selectedCounsellor} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TalentSection;