import React from "react";

const CompanySection = () => {
  return (
    <div className="bg-gradient-to-br from-green-100 to-green-200 py-12 px-6 min-h-screen">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-8">
        <p className="text-lg text-gray-700">
          Have doubts about Full Stack Development Placement Guarantee Course?
          Reach out to our counsellors by filling this form.
        </p>
        <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition">
          Speak to a counsellor
        </button>
      </div>

      {/* Companies Section */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
          Top companies hiring on Internshala
        </h2>
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {/* Logos (Use actual logo images if available) */}
          {[
            "Uber",
            "Viacom18",
            "Archies",
            "Aditya Birla",
            "Bombay Shipping Company",
            "Deloitte",
            "EY",
            "FirstCry",
            "FreeCharge",
          ].map((company, index) => (
            <div
              key={index}
              className="w-24 h-16 flex items-center justify-center bg-white rounded-md shadow-sm">
              <span className="text-gray-600 font-medium">{company}</span>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stat Card */}
          <StatCard
            number="19,818"
            description="FSD jobs & PPO opportunities"
          />
          <StatCard number="₹ 44 LPA" description="Highest salary offered" />
          <StatCard
            number="₹ 3-10 LPA"
            description="Guaranteed salary after course"
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ number, description }) => (
  <div className="bg-white rounded-lg shadow-md p-6 text-center">
    <p className="text-2xl font-extrabold text-green-600">{number}</p>
    <p className="text-gray-700 mt-2">{description}</p>
  </div>
);

export default CompanySection;
