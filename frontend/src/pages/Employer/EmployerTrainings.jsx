import React, { useState, useEffect, useContext } from "react";
import TrainingCard from "../../components/TrainingCard";
import EmployerSidebar from "../../components/EmployerSidebar";
import EmployeeSidebar from "../../components/EmployeeSidebar";
import GovtSidebar from "../../components/GovtSidebar";
import { useAuth } from "../../context/AuthContext"; // Import userAuth context

const TrainingGrid = () => {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Access the role from the userAuth context
    const { role } = useAuth();

    // Function to fetch courses from the backend
    const fetchCourses = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("token"); // Retrieve token from local storage
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/courses/getmycourse`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Include token in headers
                },
            });
            if (response.ok) {
                const data = await response.json();
                setCourses(data.courses || []); // Assuming the API returns an object with a `courses` array
            } else {
                console.error("Failed to fetch courses:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const loadMoreCourses = () => {
        // Add logic for loading more courses if supported by the backend
        console.log("Load more courses functionality");
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100
        ) {
            loadMoreCourses();
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Function to render sidebar based on role
    const renderSidebar = () => {
        if (!role) {
            return <div>Error: User role not found</div>; // Handle unexpected cases
        }

        switch (role.toLowerCase()) { // Ensure case-insensitive matching
            case "govt":
                return <GovtSidebar />;
            case "employee":
                return <EmployeeSidebar />;
            case "employer":
                return <EmployerSidebar />;
            default:
                return <div>Role not recognized</div>; // Handle unknown roles explicitly
        }
    };

    return (
        <div className="flex h-screen">
            <div>{renderSidebar()}</div>
            <div className="bg-gray-100 min-h-screen overflow-y-auto">
                {/* Header Content */}

                <header className="py-8 mt-20 bg-green-50">
                    <div className="text-center mx-auto max-w-4xl px-5">
                        <h1 className="text-3xl font-bold text-green-800">
                            Guaranteed way to start your career
                        </h1>
                        <p className="text-lg text-green-600 mt-4 leading-relaxed">
                            Guaranteed placement | 100% refund if not hired | Become job ready
                        </p>
                    </div>
                </header>

                {/* Grid Content */}
                <div className="py-10 px-5 mt-[30px] w-screen">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {courses.length > 0 ? (
                            courses.map((course, index) => (
                                <TrainingCard key={`${course.title}-${index}`} {...course} />
                            ))
                        ) : (
                            <div className="text-center text-green-600">No courses available.</div>
                        )}
                    </div>

                    {/* Loading Indicator */}
                    {isLoading && (
                        <div className="text-center mt-5 text-green-600">
                            Loading Training programs...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrainingGrid;
