import { Document } from "mongoose";

export interface IJobPosting extends Document {
  jobTitle: string;
  jobDescription: string;
  companyName: string;
  experienceLevel:
    | "Entry Level"
    | "Intermediate Level"
    | "Mid Level"
    | "Senior Level";
  candidatesList: string[];
  endDate: Date;
  _id: string;
}

export interface JobRequest {
  jobTitle: string;
  jobDescription: string;
  companyName: string;
  experienceLevel:
    | "Entry Level"
    | "Intermediate Level"
    | "Mid Level"
    | "Senior Level";
  candidatesList: string[];
  endDate: Date;
}

export interface EmailResult {
  email: string;
  success: boolean;
  error?: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  job?: IJobPosting;
  emailResults?: {
    total: number;
    successful: number;
    failed: number;
    failedEmails: Array<{
      email: string;
      error?: string;
    }>;
  };
  error?: string;
}

export interface JobEmailTemplateData {
  jobTitle: string;
  companyName: string;
  recipientName: string;
  experienceLevel: string;
  jobDescription: string;
  applicationDeadline: string;
}
