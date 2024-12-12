import mongoose from 'mongoose';
const { Schema } = mongoose;

const jobSchema = new Schema({
  // Basic Information
  title: { type: String, required: true, trim: true }, // Job title
  description: { type: String, required: true }, // Job description
  category: { type: String, required: true, enum: ['Web Development', 'Graphic Design', 'Content Writing', 'SEO', 'App Development', 'Marketing', 'Other'] }, // Job category
  subCategory: { type: String, trim: true }, // Optional subcategory (if any)

  // Budgeting
  budget: { type: Number, required: true, min: 0 }, // Budget for the job (could be hourly or fixed)
  budgetType: { type: String, required: true, enum: ['Hourly', 'Fixed', 'Annual'] }, // Whether it's hourly or fixed price
  jobType:{type: String, required: true,ref:"remote, fulltime, part time"},
  // Skills Required
  skillsRequired: { type: [String], required: true }, // Array of required skills (e.g., ['JavaScript', 'React', 'Node.js'])
  experienceLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Expert'], required: true }, // Experience level required

  // Job Duration
  duration: { type: String, enum: ['Short-term', 'Long-term', 'Permanent', 'Ongoing'], required: true }, // Duration of the job

  // Job Timing (if relevant)
  startDate: { type: Date, required: false }, // Job start date
  endDate: { type: Date }, // Optional end date (for fixed duration jobs)

  // Employer (Client) Information
  employer: {
    type: Schema.Types.ObjectId, // Reference to the employer (User model)
    ref: 'Employer', // Assuming you have a User model for employers
    required: true,
  },
  
  // Job Status (active, closed, etc.)
  status: {
    type: String,
    enum: ['Active', 'Closed', 'Pending'],
    default: 'Active', // Active by default
  },

  // Location (structured as address components)
  location: {
    address: { type: String, trim: true }, // Street address
    city: { type: String, trim: true }, // City
    state: { type: String, trim: true }, // State/Province
    postalCode: { type: String, trim: true }, // Postal/ZIP Code
    country: { type: String, trim: true }, // Country
    remote: { type: Boolean, default: false }, // If the job is remote
  },

  // Additional Features
  isUrgent: { type: Boolean, default: false }, // If the job is urgent
  area: { type: String, default: "Private" }, // If the job is featured
  attachments: [{ type: String }], // URLs for attached files (e.g., requirements, documents)

  // Timestamps for creation and modification
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

  // Optional: Track the number of applicants (if needed)
  applicantsCount: { type: Number, default: 0 },
  applicantsId: [{type: mongoose.Types.ObjectId}],
  // User ratings (if you're adding ratings for jobs)
  rating: { type: Number, min: 0, max: 5 }, // Average rating out of 5 for this job (if applicable)
});

jobSchema.pre('save', function (next) {
  this.updatedAt = Date.now(); // Update the "updatedAt" field on save
  next();
});

// Create the model for the job
const Job = mongoose.model('Job', jobSchema);

export default Job;
