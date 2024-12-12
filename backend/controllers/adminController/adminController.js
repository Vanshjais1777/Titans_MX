
// Mongoose Models (assuming your models are already defined elsewhere)
import Employer from '../../models/userProfileModel/employerModel.js';
import Employee from '../../models/userProfileModel/employeeModel.js';
import Mentor from '../../models/mentorModel/mentorModel.js';
import Job from '../../models/jobModel/jobModel.js';


// Middleware to verify admin role
const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from the authorization header
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    if (decoded.role !== 'admin') { // Check if the user is admin
      return res.status(403).json({ message: 'Permission denied' });
    }
    req.user = decoded; // Pass the decoded user information to the next middleware
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Admin controller functions to fetch all data

// Fetch all employers
export const getAllEmployers = async (req, res) => {
  try {
    const employers = await Employer.find();
    if (!employers || employers.length === 0) {
      return res.status(404).json({ message: 'No employers found' });
    }
    res.status(200).json(employers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching employers' });
  }
};

// Fetch all employees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    if (!employees || employees.length === 0) {
      return res.status(404).json({ message: 'No employees found' });
    }
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching employees' });
  }
};

// Fetch all mentors
export const getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    if (!mentors || mentors.length === 0) {
      return res.status(404).json({ message: 'No mentors found' });
    }
    res.status(200).json(mentors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching mentors' });
  }
};

// Fetch all job details
export const getAllJobDetails = async (req, res) => {
  try {
    const jobs = await Job.find();
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: 'No job details found' });
    }
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching job details' });
  }
};
