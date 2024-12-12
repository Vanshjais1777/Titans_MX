import os

# Define the model contents for each schema
models = {
    "user": '''import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['Instructor', 'Student'], required: true },
  profilePicture: { type: String },
  bio: { type: String },
  contactInfo: { type: String },
  accountStatus: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
''',

    "course": '''import mongoose from 'mongoose';

const { Schema } = mongoose;

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  language: { type: String, required: true },
  thumbnail: { type: String },
  status: { type: String, enum: ['Draft', 'Published', 'Archived'], default: 'Draft' },
  instructor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;
''',

    "module": '''import mongoose from 'mongoose';

const { Schema } = mongoose;

const moduleSchema = new Schema({
  title: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  description: { type: String },
  sequenceOrder: { type: Number, required: true },
}, { timestamps: true });

const Module = mongoose.model('Module', moduleSchema);

export default Module;
''',

    "lecture": '''import mongoose from 'mongoose';

const { Schema } = mongoose;

const lectureSchema = new Schema({
  title: { type: String, required: true },
  module: { type: Schema.Types.ObjectId, ref: 'Module', required: true },
  videoUrl: { type: String, required: true },
  fileUrl: { type: String },
  duration: { type: String },
  description: { type: String },
  transcript: { type: String },
  quiz: { type: Schema.Types.ObjectId, ref: 'Quiz' },
}, { timestamps: true });

const Lecture = mongoose.model('Lecture', lectureSchema);

export default Lecture;
''',

    "quiz": '''import mongoose from 'mongoose';

const { Schema } = mongoose;

const quizSchema = new Schema({
  title: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  passingScore: { type: Number, required: true },
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
''',

    "question": '''import mongoose from 'mongoose';

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
''',

    "enrollment": '''import mongoose from 'mongoose';

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
''',

    "review": '''import mongoose from 'mongoose';

const { Schema } = mongoose;

const reviewSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  reviewText: { type: String },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
''',

    "purchase": '''import mongoose from 'mongoose';

const { Schema } = mongoose;

const purchaseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  purchaseDate: { type: Date, default: Date.now },
  paymentStatus: { type: String, enum: ['Paid', 'Pending', 'Refunded'], required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;
''',

    "index": '''import User from './userModel.js';
import Course from './courseModel.js';
import Module from './moduleModel.js';
import Lecture from './lectureModel.js';
import Quiz from './quizModel.js';
import Question from './questionModel.js';
import Enrollment from './enrollmentModel.js';
import Review from './reviewModel.js';
import Purchase from './purchaseModel.js';

export {
  User,
  Course,
  Module,
  Lecture,
  Quiz,
  Question,
  Enrollment,
  Review,
  Purchase
};
'''
}

# Define the target directory where files will be created
target_dir = "models"

# Create the directory if it doesn't exist
if not os.path.exists(target_dir):
    os.makedirs(target_dir)

# Iterate through the models dictionary and create each model file
for model_name, model_content in models.items():
    file_name = f"./{model_name}Model.js"
    
    with open(file_name, 'w') as file:
        file.write(model_content)
    print(f"Created file: {file_name}")

