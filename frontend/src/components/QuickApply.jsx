import React, { useState } from "react";

const QuickApply = () => {
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setResume(file);
      setError("");
    } else {
      setError("Please upload a valid PDF file.");
      setResume(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!resume) {
      setError("Please upload your resume.");
      return;
    }
    alert("Application submitted successfully!");
    // Additional submission logic goes here.
  };

  return (
    <div className="container mx-auto mt-10 p-6 max-w-md bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Ready To Apply?</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded file:bg-gray-50 hover:file:bg-gray-100"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {resume && (
            <p className="text-green-500 text-sm">Uploaded: {resume.name}</p>
          )}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuickApply;
