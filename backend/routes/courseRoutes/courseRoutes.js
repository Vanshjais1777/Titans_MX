import express from 'express';
import multer from 'multer';
import path from 'path';
import {
    getMyCourses,
    createCourse,
    getCourses,
    getCourseById,
    uploadLectureFiles,
    getLecturesByCourse,
    updateLecture,
    deleteLecture,
    enrollInCourse,
    getEnrollmentsByCourse,
    addReview,
    getReviewsByCourse,
    createPurchase,
    getPurchasesByUser,
    deleteCourse,
    updateCourse,
    getEnrolledCourses
} from '../../controllers/courseController/courseController.js';

import { isAdmin } from '../../middlewares/adminvalidator.js';  // Import the isAdmin middleware

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

// === Multer File Upload Configuration ===
const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = './uploads/thumbnails/'; // Folder to store lecture files
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
        if (ext !== '.mp4' && ext !== '.pdf' && ext !== '.png' && ext !== '.jpeg' && ext !== '.docx' && ext !== '.pptx' && ext !== '.zip') {
            return cb(new Error('Only video, PDF, DOCX, PPTX, and ZIP files are allowed!'), false);
        }
        cb(null, true);
    }
});

const thumbnail = multer({ storage: storage2 });
const router = express.Router();

// === Course Routes ===
router.post('/createCourse', thumbnail.single("thumbnail"), createCourse);        // Create a new course (Admin only)
router.get('/', getCourses);           // Get all courses
router.get('/course/:id', getCourseById);    // Get a specific course by ID
router.put('/course/:id', thumbnail.single("thumbnail"), updateCourse);     // Update a course (Admin only)
router.delete('/course/:id', deleteCourse);  // Delete a course (Admin only)
router.get("/getMycourse", getMyCourses);
// === Lecture Routes ===
router.post('/:id/lectures/createLecture', upload.fields([
    { name: 'video', maxCount: 1 },
]), uploadLectureFiles);

router.get('/:id/lectures', getLecturesByCourse);  // Get all lectures in a course

// Update a lecture (with file uploads)
router.put('/lectures/:lectureId', upload.fields([
    { name: 'video', maxCount: 1 },
]), updateLecture); // Admin only

// Delete a lecture
router.delete('/lectures/:lectureId', deleteLecture); // Admin only

// === Enrollment Routes ===
router.post('/:id/enrollments', enrollInCourse);         // User can enroll (no admin check)
router.get('/:id/enrollments', getEnrollmentsByCourse);   // Get all enrollments in a course
router.get('/getMycourses', getEnrolledCourses);
// === Review Routes ===
router.post('/:id/reviews', addReview);                // User can add review (no admin check)
router.get('/:id/reviews', getReviewsByCourse);        // Get all reviews for a course

// === Purchase Routes ===
router.post('/:id/purchases', createPurchase);        // User can create a purchase (no admin check)
router.get('/myPurchases', getPurchasesByUser);         // Get all purchases by a user

export default router;
