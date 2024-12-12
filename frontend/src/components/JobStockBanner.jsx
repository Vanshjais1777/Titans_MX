import React from "react";

const JobStockBanner = () => {
  return (
    <section className="bg-green-100 py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6 text-green-800">
          Find Your Dream Job on Skills Sphere Today
        </h2>
        <p className="text-gray-700 text-lg mb-8 leading-relaxed">
          Whether you're a seasoned professional or just starting your career,
          Job Stock is your trusted platform to explore exciting opportunities.
          Let us help you discover the perfect role that aligns with your passion and skills.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
            Upload Resume
          </button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-300">
            Join Our Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default JobStockBanner;
