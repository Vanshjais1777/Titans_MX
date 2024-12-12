import express from 'express';
import { getAllMentee, getMentee, getAllMentors, registerMentor,registerMentee,sendMessage, getMessages, sendRequest, respondToMentor } from '../../controllers/mentorControllers/mentorController.js';
// import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = express.Router();

// Middleware for authentication - This can be used in the routes to protect them
// (Make sure you have an authentication middleware that verifies the JWT token)
// router.use(authenticateJWT);

// Route to create mentor and mentee
router.post("/registerMentor",registerMentor );
router.post("/registerMentee", registerMentee);


// Route to send a message
router.post('/send-message', sendMessage);

// Route to get messages between users
router.post('/get-messages', getMessages);

// Route to send a mentorship request
router.post('/send-request', sendRequest);

// Route to respond to a mentorship request (Accept/Reject)
router.post('/respond-to-mentee', respondToMentor);


// Get all mentors
router.get('/getAllMentor',getAllMentors);

// Get Mentee
router.get('/getMentee',getMentee);

router.get('/getAllMentee',getAllMentee);
// You would handle the socket setup in the server initialization, not in the routes directly
// So you don't need to define an endpoint for setting up socket connections in the routes file.
// You would integrate this in your server initialization as described below.

export default router;
