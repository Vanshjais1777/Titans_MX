import React from "react";

const StepsSection = () => {
  const sections = [
    {
      title: "For Employee",
      steps: [
        {
          number: "01",
          title: "Create an Account",
          description: "Register to access job and internship opportunities tailored to your skills.",
        },
        {
          number: "02",
          title: "Search Internship/Job",
          description: "Explore a variety of internships and jobs based on your interests.",
        },
        {
          number: "03",
          title: "Save and Apply",
          description: "Save preferred listings and apply to the ones that match your profile.",
        },
      ],
    },
    {
      title: "For Employer",
      steps: [
        {
          number: "01",
          title: "Create an Account",
          description: "Sign up to post job openings and find the best candidates for your needs.",
        },
        {
          number: "02",
          title: "Post a Job",
          description: "List job opportunities and define the required qualifications.",
        },
        {
          number: "03",
          title: "Hire from Applications",
          description: "Review applications and hire the most suitable candidates.",
        },
      ],
    },
    {
      title: "For Admin",
      steps: [
        {
          number: "01",
          title: "Create and Join as Admin",
          description: "Sign up to manage users and postings across the platform.",
        },
        {
          number: "02",
          title: "Manage Postings",
          description: "Oversee employee and employer activities, ensuring quality postings.",
        },
        {
          number: "03",
          title: "Directly Post Opportunities",
          description: "Publish job and internship opportunities directly as an admin.",
        },
      ],
    },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-700 animate-fade-in">
          Steps of Our Working Process
        </h2>
        <p className="text-center text-gray-600 mb-10 animate-slide-in-bottom">
          Understand how to engage with the platform effectively as an Employee, Employer, or Admin.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 transition-transform duration-300 hover:shadow-2xl hover:-translate-y-2 animate-scale-in"
            >
              <h3 className="text-2xl font-semibold text-center mb-6 text-green-600">
                {section.title}
              </h3>
              <div className="space-y-6">
                {section.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-full font-bold text-lg mr-4">
                      {step.number}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold">{step.title}</h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
