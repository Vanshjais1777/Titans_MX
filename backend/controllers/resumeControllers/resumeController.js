import Employee from "../../models/userProfileModel/employeeModel.js"; // Import Employee model
import fs from "fs"; // File system for saving PDFs
import path from "path"; // Path utilities
// import { PDFDocument } from 'pdf-lib'; // PDF generation library
import jwt from "jsonwebtoken";
import PDFDocument from "pdfkit";
import puppeteer from "puppeteer";
import multer from "multer";

export const getResume = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      console.error("Authentication token is missing");
      return res
        .status(401)
        .json({ message: "Authentication token is missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const employee = await Employee.findOne({ userId });
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    const resume = employee.resumeLink;
    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: "Error updating resume", error });
  }
};

// Create Resume
const createResume = async (userId) => {
  try {
    const employee = await Employee.findOne({ userId });
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    const resume = employee.createResume();
    await Employee.updateOne({ userId }, { resume: resume });
    return resume;
  } catch (error) {
    return {};
  }
};

// Update Resume
export const updateResume = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      console.error("Authentication token is missing");
      return res
        .status(401)
        .json({ message: "Authentication token is missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const employee = await Employee.findOne({ userId });
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    Object.assign(employee, req.body);
    await employee.save();

    const resume = employee.createResume();
    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: "Error updating resume", error });
  }
};

// Set up storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the directory where the file will be saved
    const dirPath = path.join("uploads", "resumes", "pdf");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true }); // Create the directory if it doesn't exist
    }
    cb(null, dirPath); // Set the destination for the file
  },
  filename: function (req, file, cb) {
    // Generate a unique filename (e.g., using the employee's ID and original file name)
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return cb(new Error("Authentication token is missing"), null);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    Employee.findOne({ userId })
      .then((employee) => {
        const fileExtension = path.extname(file.originalname); // Get file extension
        const filename = `resume_${employee._id}${fileExtension}`;
        cb(null, filename); // Set the filename
      })
      .catch((err) => {
        cb(err, null);
      });
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Upload Resume - Use multer middleware
export const uploadResume = async (req, res) => {
  try {
    // Middleware for file upload
    upload.single("resume")(req, res, async (err) => {
      if (err) {
        console.error("Error in file upload:", err);
        return res
          .status(400)
          .json({ message: "Error in file upload", error: err.message });
      }

      // Ensure file is uploaded
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Extract the token from the Authorization header
      const token = req.header("Authorization")?.replace("Bearer ", "");
      if (!token) {
        console.error("Authentication token is missing");
        return res
          .status(401)
          .json({ message: "Authentication token is missing" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      // Find the employee in the database
      const employee = await Employee.findOne({ userId });
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      // Delete existing resume file
      if (employee.resumeLink) {
        try {
          fs.unlinkSync(employee.resumeLink);
        } catch (err) {
          console.error("Error deleting existing resume file:", err);
        }
      }

      // Save the path to the uploaded resume in the employee document
      employee.resumeLink = req.file.path; // Store the path to the uploaded resume file

      // Save the updated employee record
      await employee.save();

      // Send the response
      res
        .status(200)
        .json({
          message: "Resume uploaded successfully",
          resumePath: req.file.path,
        });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading resume", error });
  }
};

export const convertHTMLToPDFAndStore = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      console.error("Authentication token is missing");
      return res
        .status(401)
        .json({ message: "Authentication token is missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const employee = await Employee.findOne({ userId });
    let resume;
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    if (!employee.resume || employee.resume == "null") {
      resume = createResume(userId);
    } else {
      resume = employee.resume;
    }

    // Render HTML with full resume data (you can modify the rendering as per your need)
    const html = `
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${resume.personalInfo.headline} - Resume</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      color: #333;
      line-height: 1.6;
      background-color: #ffffff;
    }
    .container {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
    }
    h1, h2 {
      font-size: 1.8rem;
      color: #000;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    p {
      font-size: 1rem;
      color: #333;
      margin: 5px 0;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 1.5rem;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .content-list {
      padding-left: 20px;
      list-style-type: none;
    }
    .content-list li {
      margin-bottom: 8px;
    }
    .date-range {
      font-size: 0.95rem;
      color: #555;
    }
    .italic {
      font-style: italic;
      color: #555;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header Section -->
    <h1>${resume.personalInfo.headline}</h1>
    <p><strong>${resume.personalInfo.bio}</strong></p>
    <p>Email: ${resume.personalInfo.email}</p>
    <p>Phone: ${resume.personalInfo.phone}</p>
    <p>Location: ${resume.personalInfo.location}</p>
    <p><strong>Availability:</strong> ${resume.personalInfo.availability}</p>

    <!-- Education Section -->
    <div class="section">
      <h2 class="section-title">Education</h2>
      ${resume.education
        .map(
          (edu) => `
        <p><strong>${edu.degree}</strong> at <em class="italic">${
            edu.institution
          }</em></p>
        <p class="date-range">${new Date(
          edu.startDate
        ).toLocaleDateString()} - ${
            edu.endDate ? new Date(edu.endDate).toLocaleDateString() : "Present"
          }</p>
        <p>${edu.description}</p>
      `
        )
        .join("")}
    </div>

    <!-- Skills Section -->
    <div class="section">
      <h2 class="section-title">Skills</h2>
      <ul class="content-list">
        ${resume.skills.map((skill) => `<li>${skill}</li>`).join("")}
      </ul>
    </div>

    <!-- Experience Section -->
    <div class="section">
      <h2 class="section-title">Experience</h2>
      ${resume.experienceDetails
        .map(
          (exp) => `
        <p><strong>${exp.position}</strong> at <em class="italic">${
            exp.company
          }</em></p>
        <p class="date-range">${new Date(
          exp.startDate
        ).toLocaleDateString()} - ${
            exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "Present"
          }</p>
        <p>${exp.description}</p>
      `
        )
        .join("")}
    </div>

    <!-- Career Goals Section -->
    <div class="section">
      <h2 class="section-title">Career Goals</h2>
      <p>${resume.careerGoals}</p>
    </div>

    <!-- Contact Section -->
    <div class="section">
      <h2 class="section-title">Contact</h2>
      <p>${resume.contact}</p>
    </div>

    <!-- Footer -->
    <p style="text-align:center; font-size: 0.9rem; color: #555; margin-top: 40px;">
      Created with ❤️ by ${resume.personalInfo.firstName} ${
      resume.personalInfo.lastName
    }
    </p>
  </div>
</body>
</html>
    `;

    // Path for saving the generated PDF
    const dirPath = path.join("uploads/resumes", "pdf");
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath); // Create the directory if it doesn't exist
    }

    const pdfFilePath = path.join(dirPath, `resume_${employee._id}.pdf`);

    // Generate PDF from HTML using Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    await page.pdf({ path: pdfFilePath, format: "A4" });
    await browser.close();

    // Save the file path in the employee's resume field
    employee.resumeLink = pdfFilePath;
    await employee.save();

    // Send back the download link to the client
    res
      .status(200)
      .json({
        message: "Resume PDF generated and saved successfully",
        resumelink: pdfFilePath,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating resume PDF", error });
  }
};
