import nodemailer from "nodemailer";
import { formatDate } from "./formatDate.js";
import { jobPostingEmail } from "../mail/templates/jobPosting.js";
import dotenv from "dotenv";
dotenv.config();

export class JobNotificationService {
  transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // Use port 465 for SSL
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendJobNotifications(job) {
    const results = [];

    for (const email of job.candidatesList) {
      try {
        const recipientName = email.split("@")[0]; // Basic way to get name from email

        const emailTemplateData = {
          jobTitle: job.jobTitle,
          companyName: job.companyName,
          recipientName: recipientName,
          experienceLevel: job.experienceLevel,
          jobDescription: job.jobDescription,
          applicationDeadline: formatDate(job.endDate),
        };

        const emailBody = jobPostingEmail(emailTemplateData);

        await this.transporter.sendMail({
          from: `"${job.companyName}" <${process.env.MAIL_USER}>`,
          to: email,
          subject: `New Job Opportunity at ${job.companyName}: ${job.jobTitle}`,
          html: emailBody,
        });

        results.push({ email, success: true });
        // console.log(`Job notification email sent successfully to ${email}`);
      } catch (error) {
        console.error(`Error sending job notification to ${email}:`, error);
        results.push({
          email,
          success: false,
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      }
    }

    return results;
  }
}
