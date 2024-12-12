import Message from '../../models/conversationModel/conversationModel.js';
import User from '../../models/authModel/user/userAuthModel.js'; // Assuming your User model is here
import Mentor from '../../models/mentorModel/mentorModel.js'; // Create a Mentor model
import path from 'path';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../mailControllers/mailController.js';
import Mentee from '../../models/mentorModel/menteeModel.js';
const JWT_SECRET = process.env.JWT_SECRET; // Set your JWT secret key here

// Map to store userId -> socketId
const userSockets = {};

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/mentorship/');
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

    let sender = decoded.id; // Get sender ID from decoded token
    let { receiver, message, to } = req.body;

    // Check if both sender and receiver exist in the users database
    
    if(to.toLowerCase() == "mentor"){
       sender = await Mentee.findOne({userId:sender});
       receiver = await Mentor.findById(receiver);
      if (!receiver) {
        return res.status(400).json({ message: 'Receiver not found' });
      }
      if (!sender) {
        return res.status(400).json({ message: 'Sender not found' });
      }
      
    }
    
    if(to.toLowerCase() == "mentee"){
       sender = await Mentor.findOne({userId:sender});
       receiver = await Mentee.findById(receiver);
      
      if (!receiver) {
        return res.status(400).json({ message: 'Receiver not found' });
      }
      if (!sender) {
        return res.status(400).json({ message: 'Sender not found' });
      }
      
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
      sender:sender._id,
      receiver:receiver._id,
      message,
      media,
      document,
      mode:"mentorship",
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
    const { receiver } = req.body; // Get receiver ID wihch will be mentor/mentee id from query params
    const id = await Mentor.findOne({ userId }).select('_id') || await Mentee.findOne({ userId }).select('_id');
    console.log(receiver);
    // Fetch messages between the user and the receiver
    const messages = await Message.find({
      $or: [
        { sender: id, receiver, mode:"mentorship" },
        { sender: receiver, receiver: id, mode:"mentorship" }
      ]
    }).sort({ createdAt: 1 }); // Sort by creation time (ascending)

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
};
// Function to send a mentorship request
export const sendRequest = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const menteeId = decoded.id;
    const { mentorId } = req.body;
    console.log(menteeId);
    // Find the mentee, mentor, and user documents
    const mentee = await Mentee.findOne({ userId: menteeId });
    const mentor = await Mentor.findById(mentorId);
    const user = await User.findById(menteeId);

    if (!mentor) {
      return res.status(400).json({ message: 'Invalid Id Recieved' });
    }

    if (!mentee) {
      return res.status(400).json({ message: 'Invalid Id Recieved' });
    }

    // Check if the mentorId is already in the mentee's mentor array
    const existingMentor = mentee.mentor.some(m => m.mentorId.toString() === mentorId.toString());

    if (existingMentor) {
      return res.status(400).json({ message: 'Mentor already added to mentee' });
    }

    // Check if the menteeId is already in the mentor's mentee array
    const existingMentee = mentor.mentee.some(m => m.menteeId.toString() === menteeId.toString());

    if (existingMentee) {
      return res.status(400).json({ message: 'Mentee already added to mentor' });
    }

    // If no duplicates, push the mentorId to mentee's mentor array
    mentee.mentor.push({ mentorId });

    // Push the menteeId to mentor's mentee array
    mentor.mentee.push({ menteeId });

    // Send email notification to the user (mentee)
    sendEmail(user.email, "Mentorship Request Sent", "Your mentorship request for the mentor " + mentor.mentorName + " has been sent successfully");

    // Save the updated mentee and mentor documents
    await mentee.save();
    await mentor.save();

    res.status(200).json({ message: 'Mentorship request sent' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending request' });
  }
};


// Function to accept or reject a mentorship request
export const respondToMentor = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = decoded.id;
    const { requestId, response } = req.body;

    // Find the mentorship request from the Mentee model
    const request = await Mentee.findOne({ userId: requestId });
    const mentor = await Mentor.findOne({userId});
    if(!mentor){
      return res.status(200).json({"message":"mentor not found"});
    }
     if(!request){
      return res.status(200).json({"message":"mentee not found"});
    }
    if (!request) {
      return res.status(404).json({ message: "Mentee doesn't exist anymore" });
    }

    if (response.toLowerCase() === 'accept') {
      // Accept the mentorship request - update mentor's mentee status
      const updatedMentor = await Mentor.findOneAndUpdate(
        { userId: userId, "mentee.menteeId": request._id }, // Match mentor and mentee
        { $set: { "mentee.$.status": "Accepted" } },  // Set mentee status to 'Accepted'
        { new: true }
      );

      const updatedMentee = await Mentee.findOneAndUpdate(
        { userId: requestId, "mentor.mentorId": mentor._id },
        { $set: { "mentor.$.status": "Accepted" } },
        { new: true }
      );

      if (!updatedMentor || !updatedMentee) {
        return res.status(500).json({ message: 'Error updating mentor or mentee status' });
      }

    } else if (response.toLowerCase() === 'reject') {
      // Reject the mentorship request - remove the mentee from the mentor's list
      const updatedMentor = await Mentor.findOneAndUpdate(
        { userId, "mentee.menteeId": requestId },
        { $pull: { mentee: { menteeId: requestId } } },  // Remove mentee from mentor's mentee list
        { new: true }
      );

      const updatedMentee = await Mentee.findOneAndUpdate(
        { userId: requestId, "mentor.mentorId": mentor._id },
        { $pull: { mentor: { mentorId: mentor._id } } },  // Remove mentor from mentee's mentor list
        { new: true }
      );

      if (!updatedMentor || !updatedMentee) {
        return res.status(500).json({ message: 'Error removing mentee or mentor from lists' });
      }
    } else {
      return res.status(400).json({ message: 'Invalid response. Please send "Accept" or "Reject"' });
    }
    const user = await User.findById(requestId);
    // Send email notification about the status change
    sendEmail(
      user.email,
      `Mentorship ${response}ed`,
      `Dear user, your mentorship request has been ${response}ed.`
    );

    res.status(200).json({ message: 'Request responded to successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error responding to request' });
  }
};

// Socket.io setup for one-to-one communication and mentorship chat
export const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    // Register the user and assign them a socket ID
    socket.on('register', async (token) => {
      const decoded = verifyToken(token);

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
      // Handle disconnect and remove user from the map
      for (const [userId, socketId] of Object.entries(userSockets)) {
        if (socketId === socket.id) {
          delete userSockets[userId];
          console.log(`User ${userId} disconnected.`);
          break;
        }
      }
    });

    // Handle mentor-mentee chat communication
    socket.on('send_mentorship_message', (data) => {
      const { mentorId, menteeId, message } = data;

      // Ensure the sender is either a mentor or mentee
      if (userSockets[mentorId] || userSockets[menteeId]) {
        const chatMessage = {
          sender: mentorId,
          receiver: menteeId,
          message,
        };

        // Emit message to the specific mentor-mentee channel
        io.to(userSockets[mentorId]).emit('receive_mentorship_message', chatMessage);
        io.to(userSockets[menteeId]).emit('receive_mentorship_message', chatMessage);
      }
    });

    // Handle message sending between users (general chat)
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


export const registerMentor = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(200).json({ "message": "token missing" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decode.id;

    const { mentorName, phoneNumber, email, profileLink, industry, specialist } = req.body;
    console.log(mentorName+" "+phoneNumber+" "+email+" "+profileLink+" "+industry+" "+specialist);
    // Check if the user already exists
    const existingUser = await Mentor.findById(userId);
    if (existingUser) {
      return res.status(404).json({ message: 'User not found. Please register the user first.' });
    }

    // Create a new mentor document
    const newMentor = new Mentor({
      userId,
      mentorName,
      phoneNumber,
      email,
      profileLink,
      industry,
      specialist,
      mentee: [], // Start with an empty mentee array
      rating: 0,  // Default rating of 0
    });

    // Save the new mentor to the database
    await newMentor.save();

    res.status(201).json({
      message: 'Mentor registered successfully',
      mentor: newMentor,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering mentor' });
  }
};

export const registerMentee = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(200).json({ "message": "token missing" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decode.id;
    // Check if the user already exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found. Please register the user first.' });
    }

    // Create a new mentee document
    const newMentee = new Mentee({
      userId,
      mentor: [], // Start with an empty mentor array
    });

    // Save the new mentee to the database
    await newMentee.save();

    res.status(201).json({
      message: 'Mentee registered successfully',
      mentee: newMentee,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering mentee' });
  }
};

// Function to get all mentors
export const getAllMentors = async (req, res) => {
  try {
    // Fetch all mentors from the Mentor model
    const mentors = await Mentor.find();

    if (!mentors || mentors.length === 0) {
      return res.status(404).json({ message: 'No mentors found' });
    }

    // Return the list of mentors
    res.status(200).json(mentors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving mentors' });
  }
};

export const getMentee = async (req, res) => {
  try{
    const token = req.header("Authorization")?.replace("Bearer ","");
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const userId = decoded.id;

    const mentee = await Mentee.findOne({userId});
    return res.status(200).json({"message":"Retrieved Mentee Account",mentee});
  }
  catch(e){
    return res.status(200).json({"message":"something went wrong",e});
  }
};

export const getAllMentee = async (req,res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from header
    const decoded = verifyToken(token); // Verify and decode the token

    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const userId = decoded.id;

    const mentor = await Mentor.findOne({userId});
    if(!mentor){
      return res.status(200).json({"message":"mentor not found"});
    }
    return res.status(200).json({"message":"Mentee retrieved","mentee":mentor.mentee});
  } catch (e) {
    return res.status(500).json({"message":"something went wrong",e});
  }
}