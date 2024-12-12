import Employee from "../../models/userProfileModel/employeeModel.js";
import EmployeeProfile from "../../models/userProfileModel/employeeModel.js";
import jwt from "jsonwebtoken";

export const createEmployeeProfile = async (req, res) => {
    try {
        console.log("Starting to create employee profile...");

        // Retrieve the JWT token from the Authorization header
        const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract the token
        if (!token) {
            console.error("Authentication token is missing");
            return res.status(401).json({ message: 'Authentication token is missing' });
        }

        // Decode the token to get the userId
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        console.log(`Decoded userId from token: ${userId}`);

        // Get the data from the frontend
        const {
            headline,
            bio,
            email,
            phone,
            location,
            availability,
            educationBackground,
            skills,
            experience,
            careerGoals,
            resume,
            portfolioLink,
            language,
            contact,
            experienceDetails,
            education,
        } = req.body;

        console.log("Received profile data:", {
            headline,
            bio,
            email,
            phone,
            location,
            availability,
            educationBackground,
            skills,
            experience,
            careerGoals,
            resume,
            portfolioLink,
            language,
            contact,
            experienceDetails,
            education,
        });

        // Upload Logo (URL or file path)
        const profilepic = req.file ? `/uploads/${req.file.filename}` : 'defaultProfilePic.jpg';
        console.log("Logo file:", profilepic);

        const newProfile = new EmployeeProfile({
            userId,
            headline,
            bio,
            email,
            phone,
            location,
            availability: "yes",
            educationBackground,
            skills,
            experience,
            careerGoals,
            resume,
            portfolioLink,
            language,
            contact,
            experienceDetails,
            education,
        })

        await newProfile.save();
        console.log("Employee profile saved:", newProfile);

        res.status(201).json({
            message: "Employee profile created successfully",
            data: newProfile,
        });
    } catch (error) {
        console.error("error in creating employee profile:", error);
        res.status(400).json({ message: error.message });
    }
};

export const updateEmployeeProfile = async (req, res) => {
    try {
        console.log("Starting to update employee profile...");

        const token = req.header('Authoriation')?.replace('Bearer ', '');
        if (!token) {
            console.error("Authentication token is missing");
            return res.status(401).json({ message: 'Authentication token is missing' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded._id;

        console.log(`Decoded userId from token: ${userId}`);

        const existingProfile = await EmployeeProfile.findOne({ userId });

        if (!existingProfile) {
            console.error("Employee profile not found for userId:", userId);
            return res.status(404).json({ message: 'Employee profile not found' });
        }

        console.log("Existing profile data:", existingProfile);

        const {
            fullName,
            headline,
            bio,
            email,
            phone,
            location,
            availability,
            educationBackground,
            skills,
            experience,
            careerGoals,
            resume,
            portfolioLink,
            language,
            contact,
            experienceDetails,
            education,
        } = req.body;

        console.log("Received profile data:", {
            fullName,
            headline,
            bio,
            email,
            phone,
            location,
            availability,
            educationBackground,
            skills,
            experience,
            careerGoals,
            resume,
            portfolioLink,
            language,
            contact,
            experienceDetails,
            education,
        });

        const profilepic = req.file ? `/uploads/${req.file.filename}` : existingProfile.profilepic;
        console.log("Updated profilepic:", profilepic);

        existingProfile.fullName = fullName || existingProfile.fullName;
        existingProfile.headline = headline || existingProfile.headline;
        existingProfile.bio = bio || existingProfile.bio;
        existingProfile.email = email || existingProfile.email;
        existingProfile.phone = phone || existingProfile.phone;
        existingProfile.location = location || existingProfile.location;
        existingProfile.availability = availability || existingProfile.availability;
        existingProfile.educationBackground = educationBackground || existingProfile.educationBackground;
        existingProfile.skills = skills || existingProfile.skills;
        existingProfile.experience = experience || existingProfile.experience;
        existingProfile.careerGoals = careerGoals || existingProfile.careerGoals;
        existingProfile.resume = resume || existingProfile.resume;
        existingProfile.portfolioLink = portfolioLink || existingProfile.portfolioLink;
        existingProfile.language = language || existingProfile.language;
        existingProfile.contact = contact || existingProfile.contact;
        existingProfile.experienceDetails = experienceDetails || existingProfile.experienceDetails;
        existingProfile.education = education || existingProfile.education;
        existingProfile.profilepic = profilepic || existingProfile.profilepic;

        await existingProfile.save();
        console.log("Employee profile updated:", existingProfile);

        res.status(200).json({
            message: "Employee profile updated successfully",
            data: existingProfile,
        });
    } catch (error) {
        console.error("Error in updating employer profile:", error);
        res.status(400).json({ message: error.message });
    }
};

export const readEmployeeProfile = async (req, res) => {
    try {
        console.log("Starting to retrieve employee profile...");

        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            console.error("Authentication token is missing");
            return res.status(401).json({ message: 'Authentication token is missing' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        console.log(`Decoded userId from token: ${userId}`);

        const profile = await EmployeeProfile.findOne({ userId }).populate("userId");

        if (!profile) {
            console.error("Employee profile not found for userId:", userId);
            return res.status(404).json({ message: 'Employee profile not found' });
        }

        console.log("Employee profile retrieved:", profile);

        res.status(200).json({
            message: "Employee profile retrieved successfully",
            data: profile,
        });
    } catch (error) {
        console.error("Error in retrieving employee profile:", error);
        res.status(400).json({ message: error.message });
    }
};

export const deleteEmployeeProfile = async (req, res) => {
    try {
        console.log("Starting to delete employe profile...");

        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            console.error("Authentication token is missing");
            return res.status(401).json({ message: 'Authentication token is missing' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        console.log(`Decoded userId from token: ${userId}`);

        const deletedProfile = await EmployeeProfile.findOneAndDelete({ userId });
        if (!deletedProfile) {
            console.error("Employee profile not found for userId:", userId);
            return res.status(404).json({ message: 'Employee profile not found' });
        }
        console.log("Employee profile deleted:", deletedProfile);
        res.status(200).json({
            message: "Employee profile deleted successfully",
        });
    } catch (error) {
        console.error("Error in deleting employee profile:", error);
        res.status(400).json({ message: error.message });
    }
};

export const getAllEmployee = async (req, res) => {
    const employee = await EmployeeProfile.find().populate("userId");
    return res.status(200).json({ "message": "Retrieved Employees", employee });
};
