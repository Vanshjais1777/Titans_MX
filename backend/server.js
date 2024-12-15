import express from 'express';
import cors from 'cors';
import path from "path";
import dotenv from 'dotenv';
import connectDB from "./config/mongoDB.js";
import adminAuthRouter from './routes/authRoutes/adminAuthRoutes.js';
import userAuthRouter from './routes/authRoutes/userAuthRoutes.js';
import jobRouter from './routes/jobRoutes/jobRoutes.js';
import employerProfileRouter from './routes/profileRoutes/employerProfileRoutes.js';
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

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:5173', 'https://titans-mx-frontend.onrender.com'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS policy does not allow access from origin: ${origin}`));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true, // Allow credentials like cookies, authorization headers, etc.
}));

// DB Connection
connectDB();

app.get('/', (req, res) => {
    res.send('API is working...');
});

// Routes
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
app.use('/api/courses', coursesRoutes);

// Coin Transaction Router
app.use('/api/coins', coinsRoutes);

// Routes for resume
app.use('/api/resume', resumeRoutes);

// Routes for application
app.use('/api/applicant', applicantRoutes);

// Routes for mentorship
app.use('/api/mentorship', mentorship);

// Routes for admin information
app.use('/api/admin', adminRouter);

app.use('/api/request', requestRoutes);

// Error Handling for Uncaught Errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err.name === 'Error') {
        res.status(400).json({ error: err.message });
    } else {
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
