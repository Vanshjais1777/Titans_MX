import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SingleCertification from "../pages/Employee/SingleCertification";
import { useNavigate } from "react-router-dom";

const categories = [
  "Most Popular",
  "Programming",
  "Business & Management",
  "Core Engineering",
  "Data Science",
  "Design",
  "Artificial Intelligence",
  "Creative Arts",
  "Language",
  "Career Development",
  "Architecture",
];



const categoryCourses = {
  "Most Popular": [
    { title: "Web Development", duration: "8 weeks", rating: "4.1", learners: "119,112", image: "https://via.placeholder.com/400?text=Web+Development" },
    { title: "Programming with Python", duration: "6 weeks", rating: "4.2", learners: "86,254", image: "https://via.placeholder.com/400?text=Python" },
    { title: "Digital Marketing", duration: "8 weeks", rating: "4.5", learners: "71,696", image: "https://via.placeholder.com/400?text=Digital+Marketing" },
    { title: "Machine Learning", duration: "8 weeks", rating: "4.5", learners: "36,159", image: "https://via.placeholder.com/400?text=Machine+Learning" },
  ],
  "Programming": [
    { title: "JavaScript Essentials", duration: "5 weeks", rating: "4.3", learners: "45,112", image: "https://via.placeholder.com/400?text=JavaScript" },
    { title: "C++ for Beginners", duration: "6 weeks", rating: "4.0", learners: "28,254", image: "https://via.placeholder.com/400?text=C++" },
    { title: "Java Programming", duration: "7 weeks", rating: "4.4", learners: "32,696", image: "https://via.placeholder.com/400?text=Java" },
    { title: "React Development", duration: "6 weeks", rating: "4.6", learners: "40,159", image: "https://via.placeholder.com/400?text=React" },
  ],
  "Data Science": [
    { title: "Data Visualization", duration: "6 weeks", rating: "4.5", learners: "41,312", image: "https://via.placeholder.com/400?text=Data+Visualization" },
    { title: "Python for Data Science", duration: "8 weeks", rating: "4.6", learners: "34,785", image: "https://via.placeholder.com/400?text=Python+Data+Science" },
    { title: "Big Data Fundamentals", duration: "7 weeks", rating: "4.4", learners: "29,112", image: "https://via.placeholder.com/400?text=Big+Data" },
    { title: "Statistics for Machine Learning", duration: "8 weeks", rating: "4.7", learners: "25,940", image: "https://via.placeholder.com/400?text=Statistics" },
  ],
  "Business & Management": [
    { title: "Project Management", duration: "6 weeks", rating: "4.3", learners: "50,112", image: "https://via.placeholder.com/400?text=Project+Management" },
    { title: "Leadership Skills", duration: "5 weeks", rating: "4.2", learners: "32,540", image: "https://via.placeholder.com/400?text=Leadership" },
    { title: "Business Analytics", duration: "8 weeks", rating: "4.5", learners: "28,985", image: "https://via.placeholder.com/400?text=Business+Analytics" },
    { title: "Entrepreneurship", duration: "7 weeks", rating: "4.6", learners: "21,400", image: "https://via.placeholder.com/400?text=Entrepreneurship" },
  ],
  "Core Engineering": [
    { title: "Mechanical Engineering Basics", duration: "6 weeks", rating: "4.3", learners: "35,112", image: "https://via.placeholder.com/400?text=Mechanical+Engineering" },
    { title: "Electrical Engineering Fundamentals", duration: "7 weeks", rating: "4.4", learners: "28,900", image: "https://via.placeholder.com/400?text=Electrical+Engineering" },
    { title: "Civil Engineering Projects", duration: "8 weeks", rating: "4.5", learners: " 25,800", image: "https://via.placeholder.com/400?text=Civil+Engineering" },
    { title: "Thermodynamics", duration: "6 weeks", rating: "4.2", learners: "22,400", image: "https://via.placeholder.com/400?text=Thermodynamics" },
  ],
  "Design": [
    { title: "Graphic Design Basics", duration: "6 weeks", rating: "4.5", learners: "40,100", image: "https://via.placeholder.com/400?text=Graphic+Design" },
    { title: "UI/UX Design", duration: "8 weeks", rating: "4.6", learners: "30,500", image: "https://via.placeholder.com/400?text=UI+UX+Design" },
    { title: "Interior Design", duration: "7 weeks", rating: "4.3", learners: "25,900", image: "https://via.placeholder.com/400?text=Interior+Design" },
    { title: "Fashion Design", duration: "8 weeks", rating: "4.4", learners: "20,800", image: "https://via.placeholder.com/400?text=Fashion+Design" },
  ],
  "Artificial Intelligence": [
    { title: "Introduction to AI", duration: "8 weeks", rating: "4.5", learners: "50,200", image: "https://via.placeholder.com/400?text=AI" },
    { title: "Deep Learning Basics", duration: "7 weeks", rating: "4.8", learners: "30,500", image: "https://via.placeholder.com/400?text=Deep+Learning" },
    { title: "AI for Robotics", duration: "8 weeks", rating: "4.7", learners: "25,300", image: "https://via.placeholder.com/400?text=AI+Robotics" },
    { title: "Neural Networks", duration: "6 weeks", rating: "4.9", learners: "20,800", image: "https://via.placeholder.com/400?text=Neural+Networks" },
  ],
  "Creative Arts": [
    { title: "Drawing and Sketching", duration: "6 weeks", rating: "4.4", learners: "30,900", image: "https://via.placeholder.com/400?text=Drawing" },
    { title: "Music Composition", duration: "8 weeks", rating: "4.5", learners: "25,500", image: "https://via.placeholder.com/400?text=Music" },
    { title: "Photography Basics", duration: "7 weeks", rating: "4.6", learners: "20,400", image: "https://via.placeholder.com/400?text=Photography" },
    { title: "Digital Painting", duration: "8 weeks", rating: "4.7", learners: "15,300", image: "https://via.placeholder.com/400?text=Digital+Painting" },
  ],
  "Language": [
    { title: "English Speaking", duration: "6 weeks", rating: "4.3", learners: "40,000", image: "https://via.placeholder.com/400?text=English" },
    { title: "Spanish for Beginners", duration: "8 weeks", rating: "4.6", learners: "30,800", image: "https://via.placeholder.com/400?text=Spanish" },
    { title: "French Language Essentials", duration: "7 weeks", rating: "4.4", learners: "25,600", image: "https://via.placeholder.com/400?text=French" },
    { title: "German Basics", duration: "6 weeks", rating: "4.5", learners: "20,200", image: "https://via.placeholder.com/400?text=German" },
  ],
  "Career Development": [
    { title: "Resume Writing", duration: "4 weeks", rating: "4.6", learners: "30,000", image: "https://via.placeholder.com/400?text=Resume" },
    { title: "Interview Preparation", duration: "5 weeks", rating: "4.5", learners: "25,400", image: "https://via.placeholder.com/400?text=Interview" },
    { title: "Time Management", duration: "6 weeks", rating: "4.4", learners: "20,800", image: "https://via.placeholder.com/400?text=Time+Management" },
    { title: "Effective Communication", duration: "5 weeks", rating: "4.7", learners: " 15,300", image: "https://via.placeholder.com/400?text=Communication" },
  ],
  "Architecture": [
    { title: "Architectural Design Basics", duration: "8 weeks", rating: "4.5", learners: "30,000", image: "https://via.placeholder.com/400?text=Architectural+Design" },
    { title: "Sustainable Architecture", duration: "7 weeks", rating: "4.6", learners: "25,400", image: "https://via.placeholder.com/400?text=Sustainable" },
    { title: "Building Information Modeling", duration: "6 weeks", rating: "4.7", learners: "20,800", image: "https://via.placeholder.com/400?text=BIM" },
    { title: "Urban Design", duration: "7 weeks", rating: "4.8", learners: "15,300", image: "https://via.placeholder.com/400?text=Urban+Design" },
  ],
};
const CourseGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("Most Popular");
  const [courses, setCourses] = useState(categoryCourses["Most Popular"]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (selectedCategory !== category) {
      setSelectedCategory(category);
      setCourses(categoryCourses[category]);
    }
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const closeSingleCertification = () => {
    setSelectedCourse(null);
  };

  return (
    <div>
      <div className="min-h-screen bg-green-50 flex mt-24">
        {/* Sidebar for Categories */}
        <aside className="w-1/4 bg-white shadow-lg p-4 h-screen sticky top-0 hidden md:block">
          <h2 className="text-lg font-bold text-green-700 mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li
                key={index}
                className={`text-green-600 font-semibold hover:bg-green-100 hover:scale-105 transition-transform transform hover:shadow-md cursor-pointer p-2 rounded ${selectedCategory === category ? "bg-green-100" : ""
                  }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content Section */}
        <div className="md:w-3/4 w-full overflow-auto">
          <header className="text-center py-8 bg-white shadow-md mb-4 sticky top-0 z-10">
            <h1 className="text-3xl font-bold text-green-700">{selectedCategory} Courses</h1>
            <p className="text-lg text-green-600 mt-2">
              Explore certification courses for your internship job journey!
            </p>
          </header>

          {/* Course Grid Section */}
          <div onClick={() => navigate("/employee/single-certification")}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
              >
                {courses.map((course, index) => (
                  <motion.div

                    key={`${course.title}- ${index}`}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform cursor-pointer"
                    onClick={() => handleCourseClick(course)}
                  >
                    {/* Image */}
                    <div className="relative h-44">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-green-700">
                        {course.title}
                      </h3>
                      <p className="text-sm text-green-600">{course.duration}</p>
                      <p className="text-sm text-green-600">
                        <span className="font-semibold">{course.rating}</span> ⭐ | {course.learners} learners
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Single Certification Modal */}
          {selectedCourse && (
            <SingleCertification course={selectedCourse} onClose={closeSingleCertification} />
          )}
        </div>
      </div >
    </div >
  );
};

export default CourseGrid;