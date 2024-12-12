import express from "express";
import { adminLogin } from '../../controllers/authControllers/adminAuthController.js';

const adminAuthRouter = express.Router();

adminAuthRouter.post("/admin/login", adminLogin);

export default adminAuthRouter;