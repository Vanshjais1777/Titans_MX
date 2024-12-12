import Applicant from '../../models/applicantModel/applicantModel.js'; // Assuming the model path is correct
import Job from '../../models/jobModel/jobModel.js'; // Assuming the Job model is available
import userAuthModel from '../../models/authModel/user/userAuthModel.js'; // Assuming the Job model is available
import Employee from '../../models/userProfileModel/employeeModel.js'; // Assuming the Job model is available
import jwt from 'jsonwebtoken';
import Employer from '../../models/userProfileModel/employerModel.js';
import { sendEmail } from "../../controllers/mailControllers/mailController.js";


export const apply = async (req, res) => {
  const { availability, expectedSalary, jobId } = req.body;

  // Extract the token from the request header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    console.error("Authentication token is missing");
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  let userId;

  try {
    // Step 1: Verify the token and extract userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.id;
  } catch (error) {
    // Handle invalid or expired token
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  // Step 2: Find the employee and user details based on userId
  try {
    const employee = await Employee.findOne({ userId });
    const user = await userAuthModel.findById(userId);
    if (!employee || !user) {
      return res.status(404).json({ message: 'User or employee profile not found' });
    }

    // Step 3: Validate the input data
    if (!jobId) {
      return res.status(400).json({ message: 'Job ID is required' });
    }

    const job = await Job.findById(jobId);
    const employer = await Employer.findById(job.employer);

    // Step 4: Calculate the priority based on previous applications
    const applications = await Applicant.find({ userId });
    let priority = applications.length === 0 ? 1 : 0;

    // Step 5: Create the applicant object
    const newApplicant = new Applicant({
      userId,
      employerId: job.employer,
      profilePicture: employee.profilePicture,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      resumeUrl: employee.resume.Link || "temp",
      portfolioUrl: employee.portfolioLink,
      skills: employee.skills,
      experience: employee.experience,
      availability: availability || "yes",  // Use provided availability or default to "yes"
      expectedSalary: expectedSalary || 0,  // Use provided expectedSalary or default to 0
      job: jobId,  // Reference to the job being applied to
      priority: priority  // Assign calculated priority
    });

    // Save the applicant to the database
    await newApplicant.save();

    // Step 6: Update the job with the new applicant's ID and increment applicant count
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    job.applicantsCount += 1;
    job.applicantsId.push(newApplicant._id);  // Store the applicant's ID in the job model
    job.jobType = job.jobType || "remote";    // Default job type to "remote" if not provided
    await job.save();

    try {
      sendEmail(user.email, "Application Submitted", "Your application has been successfully delivered. We will notify you when the employer takes some action.");
      // sendEmail(employer.email, `New Response From Jobs`, `New application received for the job ${job.title}. You have a total of ${job.applicantsCount} applications.`);

    } catch (e) {
      return res.status(200).json({ error: e });
    }

    // Step 7: Return a success response
    return res.status(201).json({
      message: 'Application submitted successfully',
      applicant: newApplicant,
      success: true
    });

  } catch (error) {
    // Handle any other errors
    console.error(error);
    return res.status(500).json({ message: 'Error submitting application', error, success: false });
  }
};


export const getMyApplies = async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      console.error("Authentication token is missing");
      return res.status(401).json({ message: 'Authentication token is missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const application = await Applicant.find({ userId }).populate("job");
    // console.log("users"+user);
    res.status(200).json({ application });

  } catch (e) {
    res.send("error" + e);
  }
}

export const getApplicants = async (req, res) => {
  try {
    const { jobId } = req.body;
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      console.error("Authentication token is missing");
      return res.status(401).json({ message: 'Authentication token is missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await Applicant.find({ job: jobId });
    res.status(200).json({ "data": user });

  } catch (e) {
    res.send("error" + e);
  }
}

export const approve = async (req, res) => {
  try {
    const { applicantId } = req.body;
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      console.error("Authentication token is missing");
      return res.status(401).json({ message: 'Authentication token is missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const employer = Employer.findOne({ userId });
    if (!employer) {
      return res.status(200).json({ "message": "something went wrong" });
    }
    const applicant = await Applicant.findById(applicantId);
    const user = await userAuthModel.findById(applicant.userId);
    console.log(user.email);
    if (!applicant) {
      res.status(200).json({ "message": "something went wrong" });
    }
    await Applicant.findByIdAndUpdate(applicantId, { "status": "Selected" });

    // send messages to clients

    try {

      sendEmail(user.email, "Application approved", "Your Application is approved. We will notify you when the employer take some action");


    } catch (e) {
      return res.status(200).json({ "error": e });
    }

    res.status(200).json({ "message": "Done Successfully", "success": true });

  } catch (e) {
    res.send("error" + e);
  }
};

export const underReview = async (req, res) => {
  try {
    const { applicantId } = req.body;
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      console.error("Authentication token is missing");
      return res.status(401).json({ message: 'Authentication token is missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const employer = await Employer.findOne({ userId });
    if (!employer) {
      return res.status(200).json({ "message": "something went wrong" });
    }
    const applicant = await Applicant.findById(applicantId);

    if (!applicant) {
      res.status(200).json({ "message": "something went wrong" });
    }
    await Applicant.findByIdAndUpdate(applicantId, { "status": "Under Review" });
    const user = await userAuthModel.findById(applicant.userId);
    // send messages to clients
    sendEmail(user.email, "Your profile is under review", "Your profile is under review. we will notify you once the employer take some steps.");
    res.status(200).json({ "message": "Done Successfully", "success": true });

  } catch (e) {
    res.send("error" + e);
  }
};

export const reject = async (req, res) => {
  try {
    const { applicantId } = req.body;
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      console.error("Authentication token is missing");
      return res.status(401).json({ message: 'Authentication token is missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const employer = await Employer.findOne({ userId });
    if (!employer) {
      res.status(200).json({ "message": "something went wrong" });
    }
    const applicant = await Applicant.findById(applicantId);
    const user = await userAuthModel.findById(applicant.userId);

    if (!applicant) {
      res.status(200).json({ "message": "something went wrong" });
    }
    await Applicant.findByIdAndUpdate(applicantId, { "status": "Rejected" });

    // send messages to clients
    try {

      sendEmail(user.email, "Application rejected", "Your Application is rejected. Better luck next time!");


    } catch (e) {
      return res.status(200).json({ "error": e });
    }
    res.status(200).json({ "message": "Done Successfully", "success": true });

  } catch (e) {
    res.send("error" + e);
  }
};