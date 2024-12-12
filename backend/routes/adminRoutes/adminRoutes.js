import express from 'express';
import { getAllEmployees, getAllEmployers, getAllMentors, getAllJobDetails } from '../../controllers/adminController/adminController.js';

const router = express.Router();

// Admin protected routes
router.post('/employers', getAllEmployers);
router.post('/employees', getAllEmployees);
router.post('/mentors', getAllMentors);
router.post('/job-details', getAllJobDetails);

export default router;