import express from 'express';
import { createJob, updateJob, readJob, readJobs, deleteJob, readInternship, } from '../../controllers/jobControllers/jobController.js';
import { validateJob } from '../../middlewares/validateJob.js';

const router = express.Router();

// POST /api/jobs: Create a new job
router.post('/create-job', validateJob, createJob);
router.get('/read-job/:jobId', readJob);
router.get('/read-jobs', readJobs);
router.post('/update-job', validateJob, updateJob);
router.post('/delete-job', deleteJob);
router.post('/read-internship', readInternship);

export default router;