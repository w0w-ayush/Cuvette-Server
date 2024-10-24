import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  experienceLevel: {
    type: String,
    enum: ["Entry Level", "Intermediate Level", "Mid Level", "Senior Level"],
    required: true,
  },
  candidatesList: [
    {
      type: String,
    },
  ],
  endDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model("Job", jobSchema);
