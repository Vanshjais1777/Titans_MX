import React from "react";

const categories = [
  { name: "Accounting & Finance", jobs: "122 Active Jobs", icon: "📄" },
  { name: "Automotive Jobs", jobs: "78 Active Jobs", icon: "🚗" },
  { name: "Business & Tech", jobs: "25 Active Jobs", icon: "💼" },
  { name: "Education Training", jobs: "212 Active Jobs", icon: "🎓" },
  { name: "Healthcare", jobs: "90 Active Jobs", icon: "🏥" },
  { name: "Restaurant & Food", jobs: "65 Active Jobs", icon: "🍔" },
  { name: "Transportation", jobs: "160 Active Jobs", icon: "✈️" },
  { name: "Telecom", jobs: "80 Active Jobs", icon: "📱" },
];

const Category = () => {
  return (
    <div className="py-16 bg-gray-100">
      {/* Header */}
      <div className="text-center px-4">
        <h2 className="text-3xl font-bold text-gray-800">Explore Best Categories</h2>
        <p className="mt-2 text-gray-600">
        Discover opportunities in various fields and kickstart your career in the domain you’re passionate about
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid gap-6 mt-12 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto px-4">
      {categories.map((category, index) => (
  <div
    key={index}
    className="flex flex-col items-center p-6 bg-gradient-to-br from-green-100 to-green-300 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform"
  >
    <div className="text-5xl text-purple-500">{category.icon}</div>
    <h3 className="mt-4 text-lg font-semibold text-black-800">{category.name}</h3>
    <p className="mt-2 text-sm text-black-500">{category.jobs}</p>
  </div>
))}

      </div>
    </div>
  );
};

export default Category;
