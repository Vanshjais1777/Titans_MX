import express from "express";
import multer from "multer";
import {getAllEmployer, createEmployerProfile, updateEmployerProfile, deleteEmployerProfile, readEmployerProfile } from "../../controllers/profileController/employerProfileController.js";

const employerProfileRouter = express.Router();

// Multer Configuration for File Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Routes
employerProfileRouter.post("/", upload.single("logo"), createEmployerProfile);
employerProfileRouter.post("/delete-employer", deleteEmployerProfile);
employerProfileRouter.get("/get-employer", readEmployerProfile);
employerProfileRouter.get("/get-allemployer", getAllEmployer);
employerProfileRouter.post("/update-employer", upload.single("logo"), updateEmployerProfile);
export default employerProfileRouter;