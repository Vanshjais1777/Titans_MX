import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String },
  media: { type: String },
  document: { type: String },
  isRead: { type: Boolean, default: false },  // Add isRead field
  mode:{type: String, enum:["mentorship","default"],default:"default"},
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
export default Message;
