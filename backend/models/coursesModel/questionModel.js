import mongoose from 'mongoose';

const { Schema } = mongoose;

const questionSchema = new Schema({
  questionText: { type: String, required: true },
  quiz: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  options: [{ type: String }],
  correctAnswer: { type: String, required: true },
  questionType: { type: String, enum: ['Multiple Choice', 'True/False', 'Fill-in-the-blank'], required: true },
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);

export default Question;
