import React, { useState, useEffect } from "react";
import TrainingCard from "./TrainingCard";
import axios from "axios";

const TrainingGrid = () => {
  const [courses, setCourses] = useState([]); // State to hold courses
  const [isLoading, setIsLoading] = useState(false); // Loading indicator
  const [page, setPage] = useState(1); // Pagination state

  // Fetch courses from the backend
  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/courses`);
      setCourses((prevCourses) => [...prevCourses, ...response.data]);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load more courses when user scrolls to the bottom
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      setPage((prevPage) => prevPage + 1); // Increment page number
    }
  };

  useEffect(() => {
    fetchCourses(page);
  }, [page]); // Fetch courses when page changes

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Content */}
      <header className="py-8 mt-20 bg-green-50">
        <div className="text-center mx-auto max-w-4xl px-5">
          <h1 className="text-3xl font-bold text-green-800">
            Guaranteed way to start your career
          </h1>
          <p className="text-lg text-green-600 mt-4 leading-relaxed">
            Guaranteed placement | Become job ready
          </p>
        </div>
      </header>

      {/* Grid Content */}
      <div className="py-10 px-5 mt-[30px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <TrainingCard key={`${course.title}-${index}`} {...course} />
          ))}
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="text-center mt-5 text-green-600">
            Loading more Training programs...
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingGrid;
