import fs from 'fs';
import { Course, Lecture, Enrollment, Review, Purchase } from "../../models/coursesModel/indexModel.js";
import multer from 'multer';
import path from 'path';
import jwt from 'jsonwebtoken';
import User from '../../models/authModel/user/userAuthModel.js';
import { sendEmail } from "../mailControllers/mailController.js";
// === Multer File Upload Configuration ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = './uploads/lectures'; // Folder to store lecture files
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000000 },  // Limit file size to 1GB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.mp4' && ext !== '.pdf' && ext !== '.docx' && ext !== '.pptx' && ext !== '.zip') {
      return cb(new Error('Only video, PDF, DOCX, PPTX, and ZIP files are allowed!'), false);
    }
    cb(null, true);
  }
});

// === Course Controller ===

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if(!token) return res.status(401).json({"message":"token is missing"});
    const userId = jwt.verify(token, process.env.JWT_SECRET).id;
    const thumbnail = req.file ? `/uploads/thumbnails/${Date.now() + "-" + req.file.filename}` : "temp";
    
    console.log(req.body);
    const newCourse = new Course({ ...req.body, userId, thumbnail });
    await newCourse.save();
    console.log(userId);
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: 'Error creating course', error });
  }
};

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error });
  }
};

// Get a single course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course', error });
  }
};

// Update a course
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Update course details if provided
    if (req.body.title) course.title = req.body.title;
    if (req.body.description) course.description = req.body.description;
    if (req.body.instructor) course.instructor = req.body.instructor;
    if (req.file) course.thumbnail = req.file ? `/uploads/thumbnails/${Date.now() + "-" + req.file.filename}` : course.thumbnail;
    await course.save();
    res.status(200).json({ message: 'Course updated successfully', course });
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Delete associated lectures
    await Lecture.deleteMany({ _id: { $in: course.lectures } });

    // Delete associated enrollments
    await Enrollment.deleteMany({ course: req.params.id });

    // Delete associated reviews
    await Review.deleteMany({ course: req.params.id });

    // Delete associated purchases
    await Purchase.deleteMany({ id: req.params.id });

    // Finally, delete the course
    await Course.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Course and associated data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error });
  }
};

// === Lecture Controller ===

// Upload video, notes, and assignments
export const uploadLectureFiles = async (req, res) => {
  try {
    const { title, description, duration, transcript } = req.body;

    // Ensure necessary files are uploaded
    if (!req.files || !req.files.video) {
      return res.status(400).json({ message: 'Video is required' });
    }

    // Create new lecture with file URLs
    const newLecture = new Lecture({
      title,
      description,
      videoUrl: `/uploads/lectures/${req.files.video[0].filename}`,
      course: req.params.id
    });

    await newLecture.save();
    await Course.findByIdAndUpdate(req.params.id, { $push: { lectures: newLecture._id } });

    res.status(201).json({ message: 'Lecture uploaded successfully', newLecture });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading lecture files', error });
  }
};

// Get all lectures for a course with token validation
export const getLecturesByCourse = async (req, res) => {
  try {
    // Step 1: Validate the token and extract the userId
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Authentication token is missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;  // Extract userId from decoded token

    // Step 2: Check if the user is enrolled in the course
    const courseId = req.params.id;
    const enrollment = await Enrollment.findOne({ course: courseId, student: userId });

    // Step 3: Fetch the lectures for the course
    let lectures = await Lecture.find({ course: courseId });

    // Step 4: Return only the first video if the user is not enrolled
    if (!enrollment) {
      // If the user is not enrolled, return only the first video (lecture)
      if (lectures.length > 0) {
        lectures = [lectures[0]];  // Return only the first lecture
      }
    }

    // Step 5: Send response
    res.status(200).json(lectures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching lectures', error });
  }
};

// Update a lecture
export const updateLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.lectureId);
    if (!lecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }

    // Update lecture fields
    if (req.body.title) lecture.title = req.body.title;
    if (req.body.description) lecture.description = req.body.description;
    if (req.body.duration) lecture.duration = req.body.duration;

    // Helper function to delete old files
    const deleteFileIfExists = (filePath) => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Delete the file
      }
    };

    // Delete old files if new ones are provided
    if (req.files.video) {
      // Delete the old video if it exists
      const oldVideoPath = path.join("", lecture.videoUrl.replace('/uploads', ''));
      deleteFileIfExists(oldVideoPath);

      // Set the new video URL
      lecture.videoUrl = `/uploads/lectures/${req.files.video[0].filename}`;
    }
    // Save the updated lecture
    await lecture.save();
    res.status(200).json({ message: 'Lecture updated successfully', lecture });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating lecture', error });
  }
};

// Delete a lecture
export const deleteLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findByIdAndDelete(req.params.lectureId);
    if (!lecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }
    res.status(200).json({ message: 'Lecture deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting lecture', error });
  }
};

// === Enrollment Controller ===
// Enroll a user in a course
export const enrollInCourse = async (req, res) => {
  try {
    // 1. Get token from request header and validate it
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Token is missing", success: false });

    // 2. Verify user ID from token
    const userId = jwt.verify(token, process.env.JWT_SECRET).id;

    // 3. Get course ID from URL parameters
    const courseId = req.params.id;

    // 4. Find the course to check if it exists and validate the start date
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found', code: 0 });
    }

    // 5. Check if the course has a start date and if the current date is after the start date
    const currentDate = new Date();
    const courseStartDate = new Date(course.startDate); // Assuming `startDate` field exists in the Course model

    if (courseStartDate > currentDate) {
      return res.status(400).json({ message: 'Course has not started yet', code: 0 });
    }

    // 6. If the course is paid, check if the user has purchased it
    if (course.isPaid) {  // Assuming `isPaid` is a boolean field in the Course model
      const existingPurchase = await Purchase.findOne({ userId, course: courseId });
      if (!existingPurchase) {
        return res.status(400).json({ message: 'You must purchase the course before enrolling', code: 163 });
      }
    }

    // 7. Check if the student is already enrolled in the course (optional)
    const existingEnrollment = await Enrollment.findOne({ student: userId, course: courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'You are already enrolled in this course', code: 0 });
    }

    // 8. Create a new enrollment record
    const newEnrollment = new Enrollment({
      course: courseId,
      student: userId,
      enrollmentDate: currentDate,
    });
    await newEnrollment.save();

    // 9. Add the new enrollment to the course's enrollments array
    await Course.findByIdAndUpdate(courseId, { $push: { enrollments: newEnrollment._id } });

    // 10. Find the student by their ID to get their email for sending confirmation
    const student = await User.findById(userId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // 11. Send confirmation email to the student
    const subject = 'Course Enrollment Confirmation';
    const body = `
      Hello ${student.firstName + student.lastName},
      
      You have successfully enrolled in the course: ${course.title}.
      Enrollment Date: ${currentDate.toLocaleString()}
      
      We wish you the best of luck in your learning journey!
      
      Best regards,
      Your Learning Platform
    `;

    await sendEmail(student.email, subject, body); // Send email using your sendEmail function

    res.status(201).json(newEnrollment);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Error enrolling in course', error });
  }
};

// Get all enrollments for a course
export const getEnrollmentsByCourse = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ course: req.params.id }).populate('student');
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching enrollments', error });
  }
};

// === Review Controller ===

// Add a review for a course
export const addReview = async (req, res) => {
  try {
    // 1. Get token from request header and validate it
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Token missing" });

    // 2. Verify user ID from token
    const userId = jwt.verify(token, process.env.JWT_SECRET).id;

    // 3. Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 4. Check if the user is enrolled in the course
    const courseId = req.params.id;
    const enrollment = await Enrollment.findOne({ student: userId, course: courseId });
    if (!enrollment) {
      return res.status(403).json({ message: 'You must be enrolled in the course to add a review' });
    }

    // 5. Create a new review if the user is enrolled
    const newReview = new Review({
      ...req.body,
      course: courseId,
      user: userId
    });

    // Save the review and update the course with the new review
    await newReview.save();
    await Course.findByIdAndUpdate(courseId, { $push: { reviews: newReview._id } });

    // 6. Send the newly added review as a response
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(400).json({ message: 'Error adding review', error });
  }
};

// Get all reviews for a course
export const getReviewsByCourse = async (req, res) => {
  try {
    const reviews = await Review.find({ course: req.params.id }).populate('user');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};


// Get all courses that the user has enrolled in
export const getEnrolledCourses = async (req, res) => {
  try {
    // 1. Get token from request header and validate it
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Token is missing", success: false });

    // 2. Verify user ID from token
    const userId = (jwt.verify(token, process.env.JWT_SECRET)).id;

    // 3. Find all enrollments associated with the user
    const enrollments = await Enrollment.find({ student: userId }).populate('course');

    // 4. If no enrollments found, return a message
    if (enrollments.length === 0) {
      return res.status(404).json({ message: 'No courses found for this user' });
    }

    // 5. Extract course details from populated enrollment data
    const courses = enrollments.map(enrollment => enrollment.course);

    res.status(200).json(courses); // Send back the courses the user has enrolled in
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching enrolled courses', error });
  }
};

// === Purchase Controller ===
// Assume demoPay() is a function that simulates the payment process and returns a status and transactionId
const demoPay = async (userId, courseId, amount) => {
  // Dummy implementation for demoPay
  // In a real scenario, you would call the actual payment gateway API here
  return new Promise((resolve) => {
    setTimeout(() => {
      const status = 'Paid';  // This can be 'Paid', 'Pending', or 'Refunded'
      const transactionId = `TXN${Math.floor(Math.random() * 1000000)}`;
      resolve({ status, transactionId });
    }, 2000); // Simulate async behavior with a 2-second delay
  });
};

export const createPurchase = async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return req.status(401).json({ "message": "token missing" });
    const userId = jwt.verify(token, process.env.JWT_SECRET).id;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get the course
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Simulate a payment process using demoPay function
    const { status, transactionId } = await demoPay(userId, id, course.fee);

    // Determine the payment status
    let paymentStatus;
    if (status === 'Paid') {
      paymentStatus = 'Paid';
    } else if (status === 'Pending') {
      paymentStatus = 'Pending';
    } else if (status === 'Refunded') {
      paymentStatus = 'Refunded';
    } else {
      return res.status(400).json({ message: 'Invalid payment status returned' });
    }

    // Create a new purchase record in the database
    const newPurchase = new Purchase({
      userId,
      course: id,
      price: course.fee, // Store the price of the course
      paymentStatus,
      transactionId, // Store the transaction ID
    });
    await newPurchase.save();

    res.status(201).json(newPurchase);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating purchase', error });
  }
};


// Get all purchases by user
export const getPurchasesByUser = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return req.status(401).json({ "message": "token missing" });
    const userId = jwt.verify(token, process.env.JWT_SECRET).id;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const purchases = await Purchase.find({ userId }).populate('course');
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching purchases', error });
  }
};


export const getMyCourses = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ "message": "Token Missing" });
    const userId = jwt.verify(token, process.env.JWT_SECRET).id;

    const courses = await Course.find({ userId });
    return res.status(200).json({ courses });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};