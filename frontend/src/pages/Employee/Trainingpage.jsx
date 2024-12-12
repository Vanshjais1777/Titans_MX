import React from 'react';

const TrainingPage = () => {
  return (
    <div className="bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 min-h-screen text-gray-900 flex flex-col items-center p-6">
      <main className="flex flex-col items-center w-full mt-8">
        <section className="bg-white text-gray-800 shadow-lg rounded-lg p-8 max-w-4xl w-full mb-8">
          <h2 className="text-3xl font-semibold mb-6">About the Training</h2>
          <p className="text-lg leading-relaxed">
            This training program is designed to help you gain hands-on experience in modern technologies.
            With our experienced instructors and carefully curated content, you will be equipped with the skills needed to excel in your field.
          </p>
        </section>

        <section className="bg-white text-gray-800 shadow-lg rounded-lg p-8 max-w-4xl w-full mb-8 flex">
          <div className="flex-1 pr-6">
            <h2 className="text-3xl font-semibold mb-6">Upcoming Sessions</h2>
            <ul className="list-disc pl-8 space-y-4">
              <li><strong>Web Development Basics:</strong> January 15, 2024</li>
              <li><strong>React and Tailwind CSS Workshop:</strong> January 22, 2024</li>
              <li><strong>Advanced JavaScript Techniques:</strong> January 29, 2024</li>
            </ul>
          </div>
          <div className="flex-shrink-0">
            <img
              src="https://via.placeholder.com/200x200"
              alt="Course Thumbnail"
              className="rounded-lg shadow-md"
            />
          </div>
        </section>

        <section className="bg-white text-gray-800 shadow-lg rounded-lg p-8 max-w-4xl w-full">
          <h2 className="text-3xl font-semibold mb-6">Register Now</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-lg font-medium mb-2" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 rounded-md text-lg transition"
            >
              Enroll Now
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default TrainingPage;