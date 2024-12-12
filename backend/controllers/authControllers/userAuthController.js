import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/authModel/user/userAuthModel.js';
import { sendEmail } from '../mailControllers/mailController.js';

export const userSignup = async (req, res) => {
    try {
        const { firstName, lastName, username, email, phoneNumber, profilePicture, location, role, password, student } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !username || !email || !role || !password) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }

        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ message: "Username or email already in use" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            firstName,
            lastName,
            username,
            email,
            phoneNumber,
            profilePicture,
            location,
            role: role || "employee",
            student,
            password: hashedPassword,
        });

        // Generate a JWT token
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '10h' });
        sendEmail(email, "User Registration Successful", "User registration successfully done for the Skill Sphere.");
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                "fullName": newUser.firstName + " " + newUser.lastName,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                student: newUser.student
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
        console.error("Error: ", error);
    }
};

export const userLogin = async (req, res) => {
    try {
        const { identifier, role, password } = req.body;
        console.log(req.body);
        // Validate required fields
        if (!identifier || !password) {
            return res.status(400).json({ message: "Email/Username and password are required" });
        }
        console.log(identifier);
        // Find user by email or username
        const user = await User.findOne({
            $and: [
                { $or: [{ email: identifier }, { username: identifier }] }
            ]
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '10h' });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                role: user.role,
                student:user.student
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const passwordReset = async (req, res) => {
    try {
        console.log("hello");
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ "message": "User is not registered", success: false });
        let otp = "";
        while (otp.length < 6) {
            otp = `${Math.floor(Math.random() * 1000000)}`;
        }
        user.otp = otp;
        await user.save();
        sendEmail(user.email, "Password Reset", "OTP for the password reset at Skill Sphere is " + otp);
        return res.status(200).json({ success: true });

    } catch (error) {
        return res.status(500).json({ "message": "Something went wrong", success: false });
    }
};

export const otpvalidation = async (req, res) => {
    const { otp, email } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ "message": "User is not registered" });
    if (user.otp == otp) {

        const token = jwt.sign({ email: email, password: user.password, otp }, process.env.JWT_SECRET, { expiresIn: '10m' });

        return res.status(200).json({ message: "OTP Verified", token });
    }
    return res.status(404).json({ message: "OTP not verified" });
};

export const renewPassword = async (req, res) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        console.log(token);
        if (!token) return res.status(401).json({ "message": "Unauthorized" });
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const password = req.body.password;
        const user = await User.findOne({ email: decode.email });
        user.password = await bcrypt.hash(password, 10);
        user.save();
        return res.status(200).json({ "message": "All done" });
    }
    catch (e) {
        return res.status(500).json({ message: "Something went wrong", e });
    }
};