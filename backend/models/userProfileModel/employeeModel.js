import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  // Personal Information
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref:"users"
  },
  profilePicture: {
    type: String, // URL or file path to the profile picture
    default: 'defaultProfilePic.jpg',
  },
  headline: {
    type: String,
    required: true,
    minlength: 5,
  },
  bio: {
    type: String,
    maxlength: 1000,
  },

  // Contact Information
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i, 'Please enter a valid email address'],
  },
  phone: {
    type: String,
    match: [/^\d{10}$/, 'Please enter a valid phone number'],
  },

  // Location & Availability
  location: {
    type: Object,
    required: true,
    validate: {
      validator: function (value) {
        return value && value.city && value.state && value.country;
      },
      message: 'Location fields are required'
    }
  },

  availability: {
    type: String, // E.g., "Full-time", "Part-time", "Freelance", etc.
    required: true,
  },

  // Career Information
  educationBackground: {
    type: String, // A short description or details about the employee's education
    required: false,
  },
  skills: [{
    type: String, // An array of skill keywords (e.g., "JavaScript", "React", etc.)
    required: true,
  }],
  experience: {
    type: String, // Short description of work experience
    required: false,
  },
  careerGoals: {
    type: String, // A brief text describing the employee's career goals and aspirations
    required: false,
  },

  // Additional Links
  resume: {
    type: mongoose.Schema.Types.Mixed, // A URL to the employee's resume, or a file path
    required: false,
    default:''
  },

  resumeLink:{
    type:String
  },

  portfolioLink: {
    type: String, // A URL to the employee's portfolio (e.g., GitHub, personal website)
    required: false,
  },

  // Language Proficiency
  languages: [{
    type: String, // An array of languages the employee speaks
    required: false,
  }],

  // Contact Info (could be social profiles or other ways to contact)
  contact: {
    type: String, // Contact link (e.g., LinkedIn, Twitter, etc.)
    required: false,
  },

  // Work Experience (same as before, but now better integrated into career info)
  experienceDetails: [{
    type: Object, // Define the structure if needed
    default: []
  }],

  isStudent: {
    type: Boolean,
    default:false
  },
  // Education
  education: [{
    type: Object, // Define the structure if needed
    default: []
  }],

  // Timestamps for created and updated times
}, {
  timestamps: true, // Automatically manages createdAt and updatedAt fields
});

// Method to generate a resume from the stored data
employeeSchema.methods.createResume = function () {
  const employee = this;

  // Resume structure - You can format this as you wish
  const resume = {
    personalInfo: {
      headline: employee.headline,
      bio: employee.bio,
      email: employee.email,
      phone: employee.phone,
      location: `${employee.location.city}, ${employee.location.state}, ${employee.location.country}`,
      availability: employee.availability,
      profilePicture: employee.profilePicture,
      portfolioLink: employee.portfolioLink,
    },
    education: employee.education.map((edu) => ({
      institution: edu.institution,
      degree: edu.degree,
      startDate: edu.startDate,
      endDate: edu.endDate,
      description: edu.description,
    })),
    skills: employee.skills,
    experienceDetails: employee.experienceDetails.map((exp) => ({
      company: exp.company,
      position: exp.position,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description,
    })),
    careerGoals: employee.careerGoals,
    languages: employee.languages,
    contact: employee.contact,
    resumeLink: employee.resume,
  };

  return resume; // Return the formatted resume data
};

// Create a Mongoose model from the schema
const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
