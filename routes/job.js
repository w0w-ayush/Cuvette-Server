import express from "express";
import { auth } from "../middlewares/index.js";
import { createJobPosting, getJobPostings } from "../controllers/Job.js";

const router = express.Router();

router.post("/createJob", auth, createJobPosting);
router.get("/getJobs", auth, getJobPostings);

export const jobRoutes = router;
