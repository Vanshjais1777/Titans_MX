import { Server as socketIo } from 'socket.io';
import Message from '../../models/conversationModel/conversationModel.js';
import User from '../../models/authModel/user/userAuthModel.js'; // Assuming your User model is here
import path from 'path';
import multer from 'multer';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET; // Set your JWT secret key here

// Map to store userId -> socketId
const userSockets = {};

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage: storage });

// Helper function to verify JWT
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET); // Decode and verify JWT
  } catch (error) {
    return null; // If token is invalid or expired, return null
  }
};

// Function to send a message (Create)
export const sendMessage = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from header
    const decoded = verifyToken(token); // Verify and decode the token

    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const sender = decoded.id; // Get sender ID from decoded token
    const { receiver, message } = req.body;

    // Check if both sender and receiver exist in the users database
    const senderExists = await User.findById(sender);
    const receiverExists = await User.findById(receiver);

    if (!senderExists) {
      return res.status(400).json({ message: 'Sender not found' });
    }

    if (!receiverExists) {
      return res.status(400).json({ message: 'Receiver not found' });
    }

    let media = null;
    let document = null;

    // Handle media file if uploaded
    if (req.file && req.file.mimetype.startsWith('image')) {
      media = req.file.path;
    }

    // Handle document file if uploaded
    if (req.files && req.files.document) {
      document = req.files.document[0].path;
    }

    const newMessage = new Message({
      sender,
      receiver,
      message,
      media,
      document,
    });

    await newMessage.save();
    res.status(200).json(newMessage);

    // Emit message to the receiver (one-to-one communication)
    if (userSockets[receiver]) {
      const socketId = userSockets[receiver]; // Get receiver's socket ID
      io.to(socketId).emit('receive_message', newMessage); // Send the message to the receiver
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending message' });
  }
};

// Function to read messages (Read)
export const getMessages = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from header
    const decoded = verifyToken(token); // Verify and decode the token

    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = decoded.id; // Get user ID from decoded token
    const { receiver } = req.body; // Get receiver ID from query params

    // Fetch messages between the user and the receiver
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver },
        { sender: receiver, receiver: userId }
      ]
    }).sort({ createdAt: 1 }); // Sort by creation time (ascending)

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
};


// Socket.io setup for one-to-one communication
export const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    // Listen for a user to register with their userId (and verify their token)
    socket.on('register', async (token) => {
      const decoded = verifyToken(token); // Verify token from the client

      if (!decoded) {
        socket.emit('error', { message: 'Unauthorized' });
        socket.disconnect();
        return;
      }

      const userId = decoded.userId;
      userSockets[userId] = socket.id;
      console.log(`User ${userId} is now connected with socket id: ${socket.id}`);
    });

    socket.on('disconnect', () => {
      for (const [userId, socketId] of Object.entries(userSockets)) {
        if (socketId === socket.id) {
          delete userSockets[userId];
          console.log(`User ${userId} disconnected.`);
          break;
        }
      }
    });

    // Handle message sending from client
    socket.on('send_message', (data) => {
      const { receiver, sender, message } = data;

      Message.create({
        sender,
        receiver,
        message,
      }).then((newMessage) => {
        if (userSockets[receiver]) {
          const socketId = userSockets[receiver];
          io.to(socketId).emit('receive_message', newMessage);
        }
      });
    });
  });
};
