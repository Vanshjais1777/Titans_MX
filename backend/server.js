import express from 'express';
import cors from 'cors';
import path from "path";
import dotenv from 'dotenv';
import connectDB from "./config/mongoDB.js";
import adminAuthRouter from './routes/authRoutes/adminAuthRoutes.js';
import userAuthRouter from './routes/authRoutes/userAuthRoutes.js'
import jobRouter from './routes/jobRoutes/jobRoutes.js'
import employerProfileRouter from './routes/profileRoutes/employerProfileRoutes.js'
import employeeProfileRouter from './routes/profileRoutes/employeeProfileRoutes.js';
import conversationRouter from './routes/conversationRoutes/conversationRoutes.js';
import coursesRoutes from './routes/courseRoutes/courseRoutes.js';
import coinsRoutes from './routes/coinManagementRoutes/coinManagementRoutes.js';
import resumeRoutes from './routes/resumeRoutes/resumeRoutes.js';
import applicantRoutes from './routes/applicantRoutes/applicantRoutes.js';
import mentorship from './routes/mentorRoutes/mentorRoutes.js';
import adminRouter from './routes/adminRoutes/adminRoutes.js';
import requestRoutes from './routes/requestRoutes/requestRoutes.js';
dotenv.config();


const app = express();





// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Static Folder for Uploads
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));


// using CORS
app.use(cors());


// DB Connection
connectDB();

app.get('/', (req, res) => {
    res.send('API is working...');
});


app.use('/api/auth/admin', adminAuthRouter);
app.use('/api/auth/user', userAuthRouter);

// Employer Router
app.use('/api/profile/employer', employerProfileRouter);
app.use('/api/profile/employee', employeeProfileRouter);

// Job router
app.use('/api/job', jobRouter);

// Conversation router
app.use('/api/conversation', conversationRouter);

// Course Router
// Use the course routes
app.use('/api/courses', coursesRoutes);  // Prefix all routes with `/api`

//Coin Transaction Router
app.use('/api/coins/',coinsRoutes);

//Routes for resume
app.use('/api/resume',resumeRoutes);

//Routes for application
app.use('/api/applicant',applicantRoutes);

//Routes for mentorship
app.use('/api/mentorship',mentorship);

// Routes for admin information
app.use('/api/admin',adminRouter);

app.use('/api/request',requestRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
