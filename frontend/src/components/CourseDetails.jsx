import React from "react";
import { useNavigate } from "react-router-dom";
import CompanySection from "./CompanySection";
import GuarenteedPla from "./GuarenteedPla";
import TopCareerOpt from "./TopCareerOpt";

const CourseDetails = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-green-200 to-green-300 flex justify-center items-center p-6">
        <div className="max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-500 to-green-400 text-white p-8">
            <h1 className="text-3xl font-bold">
              Full Stack Development Course with Guaranteed Placement
            </h1>
            <p className="mt-2 text-lg">
              Get placed with <span className="font-bold">₹3-10 LPA</span>{" "}
              salary
            </p>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              Introducing Live Bootcamp
            </button>
          </div>

          {/* Course Details */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Side */}
              <div>
                <p className="text-gray-600 font-semibold">Online</p>
                <h2 className="text-xl font-bold">6 months</h2>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">
                  Admission Closes On
                </p>
                <h2 className="text-xl font-bold text-red-500">7th Dec</h2>
                <p className="text-sm text-yellow-600 font-semibold">
                  Limited seats
                </p>
              </div>

              {/* Right Side */}
              <div>
                <p className="text-gray-600 font-semibold">Course Fee</p>
                <h2 className="text-xl font-bold text-green-600">
                  ₹42,000{" "}
                  <span className="line-through text-gray-400">₹50,000</span>
                </h2>
                <p className="text-sm font-semibold text-green-500">
                  Save ₹8,000/-
                </p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Guarantee</p>
                <h2 className="text-xl font-bold">
                  100% refund{" "}
                  <span className="text-gray-500">(if not hired)</span>
                </h2>
              </div>
            </div>

            {/* Application Section */}
            <div className="mt-6 border-t pt-4 flex justify-between items-center">
              <button
                onClick={() => navigate("/fullstack-form")}
                className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600">
                Enroll
              </button>
              <p className="text-gray-600 text-sm">
                <span className="font-bold">179,458</span> already applied
              </p>
            </div>
          </div>
        </div>
      </div>
      <TopCareerOpt />
      <GuarenteedPla />
      <CompanySection />
    </>
  );
};

export default CourseDetails;
