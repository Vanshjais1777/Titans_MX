import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import Job from '../../models/jobModel/jobModel.js';
import Employer from '../../models/userProfileModel/employerModel.js';  // Import Employer model

// Utility function to verify and extract userId from JWT
const verifyToken = (token) => {
  if (!token) {
    throw new Error('Authentication token is missing');
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};

// CREATE: Create a new job
export const createJob = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Return validation errors
  }

  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');  // Extract token
    const userId = verifyToken(token);  // Verify and extract userId from token

    const {
      title,
      description,
      category,
      subCategory,
      budget,
      budgetType,
      jobType = 'Full Time', // Default to Full Time
      skillsRequired,
      experienceLevel,
      duration,
      startDate,
      endDate,
      location,  // Ensure location is provided as an object
      remote,
      isUrgent,
      area,
      attachments,
    } = req.body;

    // Ensure location is structured correctly (address, city, state, postalCode, country)
    const newJob = new Job({
      title,
      description,
      category,
      subCategory,
      budget,
      budgetType,
      jobType,
      skillsRequired,
      experienceLevel,
      duration,
      startDate,
      endDate,
      employer: userId,
      location,  // Storing location as an object
      remote,
      isUrgent,
      area,
      attachments,
    });

    const savedJob = await newJob.save();

    // Add the job's ObjectId to the employer's jobPostings array
    await Employer.findOneAndUpdate(
      { userId },
      { $push: { jobPostings: { jobId: savedJob._id } } },
      { new: true }
    );

    return res.status(201).json({
      message: 'Job created successfully',
      job: savedJob,
    });

  } catch (error) {
    console.error('Error creating job:', error);
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// READ: Get a job by its ID
export const readJob = async (req, res) => {
  const { jobId } = req.params;
  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    return res.status(200).json({ job });
  } catch (error) {
    console.error('Error fetching job:', error);
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// READ: Get all jobs (without authorization)
export const readJobs = async (req, res) => {
  try {
    const jobs = await Job.find();  // Get all jobs

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: 'No jobs found' });
    }

    return res.status(200).json({ jobs });

  } catch (error) {
    console.error('Error fetching jobs:', error);
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const readInternship = async (req,res) => {
  try {
    const internship = await Job.find({jobType: "Internship"});
    if(!internship){
      return res.status(404).json({message: "No internship found"});
    }
    return res.status(200).json({message: "Internships retrieved", internship});
  } catch (error) {
    return res.status(500).json({message: "Internal server error", error});
  }
};

// UPDATE: Update a job by its ID (with token and jobId in the body)
export const updateJob = async (req, res) => {
  const { jobId } = req.body;  // Extract jobId from the request body
  const updates = req.body;  // Get the updates from the request body
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Extract token from Authorization header

  try {
    const userId = verifyToken(token);  // Verify and extract userId from token

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if the authenticated user is the employer who posted the job
    if (job.employer.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to update this job' });
    }

    // Update the job with the provided data
    const updatedJob = await Job.findByIdAndUpdate(jobId, updates, { new: true });
    if (!updatedJob) {
      return res.status(500).json({ message: 'Failed to update the job' });
    }

    return res.status(200).json({
      message: 'Job updated successfully',
      job: updatedJob,
    });
  } catch (error) {
    console.error('Error updating job:', error);
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// DELETE: Delete a job by its ID (with token and jobId in the body)
export const deleteJob = async (req, res) => {
  const { jobId } = req.body;  // Extract jobId from the request body
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Extract token from Authorization header

  try {
    const userId = verifyToken(token);  // Verify and extract userId from token

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if the authenticated user is the employer who posted the job
    if (job.employer.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this job' });
    }

    const deletedJob = await Job.findByIdAndDelete(jobId);
    if (!deletedJob) {
      return res.status(500).json({ message: 'Failed to delete the job' });
    }

    // Remove the job's ObjectId from the employer's jobPostings array
    await Employer.updateOne(
      { userId: userId },
      { $pull: { jobPostings: { jobId: jobId } } }
    );

    return res.status(200).json({
      message: 'Job deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
