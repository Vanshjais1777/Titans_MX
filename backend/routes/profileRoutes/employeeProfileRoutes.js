import express from "express";
import multer from "multer";
import {getAllEmployee, createEmployeeProfile, updateEmployeeProfile, deleteEmployeeProfile, readEmployeeProfile } from "../../controllers/profileController/employeeProfileController.js"

const employeeProfileRouter = express.Router();

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });


employeeProfileRouter.post("/", upload.single("profilepic"), createEmployeeProfile);
employeeProfileRouter.delete("/delete-employee", deleteEmployeeProfile);
employeeProfileRouter.get("/get-employee", readEmployeeProfile);
employeeProfileRouter.post("/update-employee", updateEmployeeProfile);
employeeProfileRouter.get("/get-allemployee", getAllEmployee);

export default employeeProfileRouter;