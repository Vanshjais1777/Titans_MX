import mongoose from 'mongoose';

const { Schema } = mongoose;

const enrollmentSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  enrollmentDate: { type: Date, default: Date.now },
  completionStatus: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
  progress: { type: Number, default: 0 },
}, { timestamps: true });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

export default Enrollment;
