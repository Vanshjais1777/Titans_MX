import express from "express";
const router = express.Router();
import { sendMessage, getMessages, setupSocket } from '../../controllers/conversationControllers/conversationController.js';
import multer from "multer";
// Multer setup for document upload
const upload = multer({ dest: 'uploads/' });

// Route to send a message with optional media and document
router.post('/send-message', upload.single('media'), upload.fields([{ name: 'document', maxCount: 1 }]), sendMessage);
router.get('/get-message', getMessages);

// This is for setting up real-time socket communication (Server-side Socket.IO setup)
export default router;
