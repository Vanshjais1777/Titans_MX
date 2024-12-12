import express from 'express';
import {
  updateResume,
  uploadResume,
  getResume,
  convertHTMLToPDFAndStore
} from '../../controllers/resumeControllers/resumeController.js';

const router = express.Router();

// Route to create a new resume (with user authentication)
router.post('/generate', convertHTMLToPDFAndStore);

// Route to update the existing resume (with user authentication)
router.post('/updateResume', updateResume);

// Route to upload a resume file (JSON)
router.post('/upload', uploadResume);

// Route to get resume file (PDF)
router.post('/getResume', getResume);

export default router;
