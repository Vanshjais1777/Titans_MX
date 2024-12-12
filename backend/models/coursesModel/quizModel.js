import mongoose from 'mongoose';

const { Schema } = mongoose;

const quizSchema = new Schema({
  title: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  passingScore: { type: Number, required: true },
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
