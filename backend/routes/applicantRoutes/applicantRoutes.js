import {Router} from "express";
import {apply,getApplicants,getMyApplies,reject,underReview,approve} from "../../controllers/applicantControllers/applicantController.js";

const router = new Router();

router.post("/apply",apply);

router.post("/getApplies",getMyApplies);

router.post("/getApplicants",getApplicants);

router.post("/approve",approve);

router.post("/underReview",underReview);

router.post("/reject",reject);


export default router;