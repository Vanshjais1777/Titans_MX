import mongoose from 'mongoose';

const employerSchema = new mongoose.Schema({
  // Basic Information
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "users",
    unique: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  companyLogo: {
    type: String, // URL or path to the company logo image
    default: 'defaultLogo.jpg',
  },
  companyDescription: {
    type: String,
    required: true,
    minlength: 20,
  },
  website: {
    type: String, // Optional website link
    match: [/^https?:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,6}(\/[a-zA-Z0-9\-\.\/]*)?$/, 'Please enter a valid URL'],
  },

  // Employer Business Details
  industry: {
    type: String,
    required: true,
    // enum: ['Tech', 'Marketing', 'Finance', 'Healthcare', 'Education', 'Other'],
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },

  // Job Postings
  jobPostings: [{
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job', // Reference to a job model
      required: true,
    },
    datePosted: {
      type: Date,
      default: Date.now,
    },
  }],

  // Company Ratings
  ratings: [{
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee', // Reference to Employee model
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      maxlength: 500,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  }],

  // Timestamps
}, {
  timestamps: true,
});

const Employer = mongoose.model('Employer', employerSchema);

export default Employer;
