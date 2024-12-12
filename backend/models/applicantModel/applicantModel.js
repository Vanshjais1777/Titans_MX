import mongoose from 'mongoose';
const { Schema } = mongoose;

const applicantSchema = new Schema({
  // Applicant Information
  userId: { type: mongoose.Types.ObjectId, ref: "user" },
  employerId: { type: mongoose.Types.ObjectId, ref: "user" },
  profilePicture: { type: String, required: true, trim: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phoneNumber: { type: String, required: true, trim: true },
  resumeUrl: { type: String, required: true }, // URL to the applicant's resume (can be a path or link to uploaded file)
  portfolioUrl: { type: String }, // Optional portfolio URL if relevant (e.g., for design or development roles)
  priority: { type: Number },
  // Job Application Details
  job: {
    type: Schema.Types.ObjectId, // Reference to the Job model
    ref: 'Job',
    required: true,
  },
  applicationDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['Applied', 'Under Review', 'Selected', 'Rejected'], // Status of the application
    default: 'Applied',
  },

  // Applicant Skills and Experience
  skills: { type: [String] }, // Skills provided by the applicant
  Experience: { type: String, min: 0 }, // Number of years of experience in the relevant field

  // Additional Information (optional)
  availability: {
    type: String,
  },
  expectedSalary: { type: Number, min: 0 }, // Expected salary (if applicable)

  // Timestamps for creation and modification
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

applicantSchema.pre('save', function (next) {
  this.updatedAt = Date.now(); // Update the "updatedAt" field on save
  next();
});

// Create the model for the applicant
const Applicant = mongoose.model('Applicant', applicantSchema);

export default Applicant;
