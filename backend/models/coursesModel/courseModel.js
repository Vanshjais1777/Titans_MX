import mongoose from 'mongoose';

const { Schema } = mongoose;

const courseSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  language: { type: String, required: true },
  thumbnail: { type: String, required: true },
  status: { type: String, enum: ['Private', 'Published','Draft'], default: 'Published' },
  instructor: { type: String, ref: 'User', required: true },
  isPaid: { type: Boolean, required: true, enum: [false, true], default: false },
  fee: { type: Number, default: 0 }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;
