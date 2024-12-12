import jwt from 'jsonwebtoken';
import EmployerProfile from "../../models/userProfileModel/employerModel.js";

// Create Employer Profile
export const createEmployerProfile = async (req, res) => {
    try {
        console.log("Starting to create employer profile...");

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

        // Destructure the necessary fields from the request body
        const {
            companyName,
            companyEmail,
            location,
            industry,
            website,
            companyDescription
        } = req.body;

        console.log("Received profile data:", { companyName, companyEmail, location, industry, website, companyDescription });

        // Upload logo (URL or file path)
        const logo = req.file ? `/uploads/${req.file.filename}` : 'defaultLogo.jpg'; // Use default logo if no file uploaded
        console.log("Logo file:", logo);

        // Create a new employer profile document
        const newProfile = new EmployerProfile({
            userId, // Set the userId retrieved from the JWT token
            companyName,
            companyEmail,
            location,
            industry,
            website,
            companyDescription,
            logo,
        });

        // Save the profile to the database
        await newProfile.save();
        console.log("Employer profile saved:", newProfile);

        // Send a response with the new employer profile
        res.status(201).json({
            message: "Employer profile created successfully",
            data: newProfile,
        });
    } catch (error) {
        // Handle any errors during the profile creation
        console.error("Error in creating employer profile:", error);
        res.status(400).json({ message: error.message });
    }
};

// Update Employer Profile
export const updateEmployerProfile = async (req, res) => {
    try {
        console.log("Starting to update employer profile...");

        // Retrieve the JWT token from the Authorization header
        const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract the token
        if (!token) {
            console.error("Authentication token is missing");
            return res.status(401).json({ message: 'Authentication token is missing' });
        }

        // Decode the token to get the userId
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify and decode using your JWT secret
        const userId = decoded.id; // Assuming the token has 'userId' as part of the payload

        console.log(`Decoded userId from token: ${userId}`);

        // Find the existing employer profile by userId
        const existingProfile = await EmployerProfile.findOne({ userId });
        if (!existingProfile) {
            console.error("Employer profile not found for userId:", userId);
            return res.status(404).json({ message: 'Employer profile not found' });
        }

        console.log("Existing profile data:", existingProfile);

        // Destructure the necessary fields from the request body
        const {
            companyName,
            companyEmail,
            companyLocation,
            industry,
            website,
            description
        } = req.body;

        console.log("Received updated profile data:", { companyName, companyEmail, companyLocation, industry, website, description });

        // Check if there's a new logo file, otherwise, use the existing one
        const logo = req.file ? `/uploads/${req.file.filename}` : existingProfile.logo;
        console.log("Updated logo:", logo);

        // Update the profile with new data
        existingProfile.companyName = companyName || existingProfile.companyName;
        existingProfile.companyEmail = companyEmail || existingProfile.companyEmail;
        existingProfile.location = companyLocation || existingProfile.location;
        existingProfile.industry = industry || existingProfile.industry;
        existingProfile.website = website || existingProfile.website;
        existingProfile.companyDescription = description || existingProfile.companyDescription;
        existingProfile.logo = logo;

        // Save the updated profile to the database
        await existingProfile.save();
        console.log("Employer profile updated:", existingProfile);

        // Send a response with the updated employer profile
        res.status(200).json({
            message: "Employer profile updated successfully",
            data: existingProfile,
        });
    } catch (error) {
        // Handle any errors during the profile update
        console.error("Error in updating employer profile:", error);
        res.status(400).json({ message: error.message });
    }
};

// Read Employer Profile
export const readEmployerProfile = async (req, res) => {
    try {
        console.log("Starting to retrieve employer profile...");

        // Retrieve the JWT token from the Authorization header
        const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract the token
        if (!token) {
            console.error("Authentication token is missing");
            return res.status(401).json({ message: 'Authentication token is missing' });
        }

        // Decode the token to get the userId
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify and decode using your JWT secret
        const userId = decoded.id; // Assuming the token has 'userId' as part of the payload

        console.log(`Decoded userId from token: ${userId}`);

        // Find the employer profile by userId
        const profile = await EmployerProfile.findOne({ userId }).populate("userId");
        if (!profile) {
            console.error("Employer profile not found for userId:", userId);
            return res.status(404).json({ message: 'Employer profile not found' });
        }

        console.log("Employer profile retrieved:", profile);

        // Send the profile data
        res.status(200).json({
            message: "Employer profile retrieved successfully",
            data: profile,
        });
    } catch (error) {
        // Handle any errors during the profile retrieval
        console.error("Error in retrieving employer profile:", error);
        res.status(400).json({ message: error.message });
    }
};

// Delete Employer Profile
export const deleteEmployerProfile = async (req, res) => {
    try {
        console.log("Starting to delete employer profile...");

        // Retrieve the JWT token from the Authorization header
        const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract the token
        if (!token) {
            console.error("Authentication token is missing");
            return res.status(401).json({ message: 'Authentication token is missing' });
        }

        // Decode the token to get the userId
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify and decode using your JWT secret
        const userId = decoded.id; // Assuming the token has 'userId' as part of the payload

        console.log(`Decoded userId from token: ${userId}`);

        // Find and delete the employer profile by userId
        const deletedProfile = await EmployerProfile.findOneAndDelete({ userId });
        if (!deletedProfile) {
            console.error("Employer profile not found for userId:", userId);
            return res.status(404).json({ message: 'Employer profile not found' });
        }

        console.log("Employer profile deleted:", deletedProfile);

        // Send success response
        res.status(200).json({
            message: "Employer profile deleted successfully",
        });
    } catch (error) {
        // Handle any errors during the profile deletion
        console.error("Error in deleting employer profile:", error);
        res.status(400).json({ message: error.message });
    }
};

export const getAllEmployer = async (req, res) => {
    try {
        const employer = await EmployerProfile.find();
        return res.status(200).json({ "message": "Employer retrieved", employer });
    } catch (e) {
        return res.status(500).json({ "message": "something went wrong", e });
    }
}