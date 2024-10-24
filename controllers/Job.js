import JobPosting from "../models/Job.js";
import User from "../models/User.js";
import { JobNotificationService } from "../utils/jobNotificationService.js";

// Create an instance of JobNotificationService
const notificationService = new JobNotificationService();

// Function to create a job posting
export const createJobPosting = async (req, res) => {
  try {
    const {
      jobTitle,
      jobDescription,
      experienceLevel,
      candidatesList,
      endDate,
    } = req.body;

    if (
      !jobTitle ||
      !jobDescription ||
      !experienceLevel ||
      !candidatesList ||
      !endDate
    ) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
      return;
    }

    const newJobPosting = new JobPosting({
      jobTitle,
      jobDescription,
      experienceLevel,
      candidatesList,
      endDate: new Date(endDate),
    });

    const savedJob = await newJobPosting.save();

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { jobPostings: savedJob._id } },
      { new: true }
    );

    const companyName = req.user.companyName;
    savedJob.companyName = companyName;

    const emailResults = await notificationService.sendJobNotifications(
      savedJob
    );

    const successfulEmails = emailResults.filter((result) => result.success);
    const failedEmails = emailResults.filter((result) => !result.success);

    res.status(201).json({
      success: true,
      message: "Job posting created successfully",
      job: savedJob,
      emailResults: {
        total: emailResults.length,
        successful: successfulEmails.length,
        failed: failedEmails.length,
        failedEmails: failedEmails.map((result) => ({
          email: result.email,
          error: result.error,
        })),
      },
    });
  } catch (error) {
    console.error("Error in createJobPosting:", error);
    res.status(500).json({
      success: false,
      message: "Error creating job posting",
      error: error.message || "Unknown error occurred",
    });
  }
};

// Function to get job postings
export const getJobPostings = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate({
      path: "jobPostings",
      options: { sort: { createdAt: -1 } },
    });

    if (!user || !user.jobPostings || user.jobPostings.length === 0) {
      res.status(404).json({ message: "No job postings found." });
      return;
    }

    const companyName = req.user.companyName;

    res.status(200).json({ jobPostings: user.jobPostings, companyName });
  } catch (error) {
    console.error("Error in getJobPostings:", error);
    res.status(500).json({ message: "Server error." });
  }
};
