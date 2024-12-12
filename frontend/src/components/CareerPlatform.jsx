import React from "react";

const CareerPlatform = () => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Dynamic Career Assessment Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-lg shadow-md p-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Dynamic Career Assessment Platform
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Career Test or Career Aptitude Test is a tool to determine your strengths and interest areas. The functionality of our dynamic career assessment platform reveals only those career options for which you are eligible. This depends on Subjects/Stream/Course selected in the past. Furthermore, the career options in our career test are dynamically populated to include new-age career options.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Moreover, our career assessment reveals both Inborn as well as Acquired Intelligence. Hence our career test is independent of the individual's mindset while giving the test. The best part is that results of the Inborn intelligence test do not change over a period of time.
            </p>
            <button className="mt-6 px-6 py-3 bg-green-500 text-white font-bold rounded-md shadow hover:bg-green-600">
              Start Assessment
            </button>
          </div>
          <div className="flex justify-center">
            <img
              src="src/assets/Dynamic-Career-Assessment-Platform.gif"
              alt="Career Test Illustration"
              className="rounded-md"
            />
          </div>
        </div>

        {/* Explore Career Options Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-lg shadow-md p-8 mt-12">
          <div className="flex justify-center">
            <img
              src="src/assets/Explore-Career-Options.gif"
              alt="Explore Careers Illustration"
              className="rounded-md"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Explore Career Options
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Our counsellors recommend a wide variety of new-age career options that are expected to be in demand in the coming time. Moreover, we furnish a detailed Career Roadmap for these career options along with a list of top colleges/institutions and their admission process.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              In addition, you get to know about growth opportunities, expected salary, profile-building measures like certifications, internships, and complete career guidance to excel in that career.
            </p>
            <button className="mt-6 px-6 py-3 bg-green-500 text-white font-bold rounded-md shadow hover:bg-green-600">
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPlatform;