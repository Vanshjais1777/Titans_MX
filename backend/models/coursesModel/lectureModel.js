import mongoose from 'mongoose';

const { Schema } = mongoose;

const lectureSchema = new Schema({
  title: { type: String, required: true },
  module: { type: Schema.Types.ObjectId, ref: 'Module', required: true },
  videoUrl: { type: String },  // Store video URL (local path or cloud storage URL)
  notesUrl: { type: String },   // Store notes file URL
  assignmentUrl: { type: String }, // Store assignment file URL
  duration: { type: String },
  description: { type: String },
  transcript: { type: String },
  quiz: { type: Schema.Types.ObjectId, ref: 'Quiz' },
}, { timestamps: true });

const Lecture = mongoose.model('Lecture', lectureSchema);

export default Lecture;
