export const jobPostingEmail = (jobDetails) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Job Opportunity at ${jobDetails.companyName}</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
              color: #333;
          }
          .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .logo {
              display: block;
              margin: 0 auto 20px;
              max-width: 150px;
          }
          .message {
              text-align: center;
              font-size: 24px;
              color: #007bff;
              margin-bottom: 20px;
          }
          .job-card {
              background-color: #f9f9f9;
              border: 1px solid #ddd;
              border-radius: 8px;
              padding: 20px;
          }
          .job-title {
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 10px;
          }
          .company-name {
              font-size: 16px;
              color: #555;
              margin-bottom: 20px;
          }
          .job-details p {
              font-size: 14px;
              line-height: 1.5;
              margin: 8px 0;
          }
          .detail-label {
              font-weight: bold;
          }
          .cta-button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #007bff;
              color: white;
              text-decoration: none;
              border-radius: 4px;
              font-size: 16px;
              margin-top: 20px;
          }
          .cta-button:hover {
              background-color: #0056b3;
          }
          .footer {
              text-align: center;
              font-size: 12px;
              color: #999;
              margin-top: 30px;
          }
          .footer a {
              color: #007bff;
              text-decoration: none;
          }
          .footer a:hover {
              text-decoration: underline;
          }
          @media only screen and (max-width: 600px) {
              .container {
                  padding: 15px;
              }
              .message {
                  font-size: 20px;
              }
              .cta-button {
                  width: 100%;
                  text-align: center;
              }
          }
      </style>
  </head>
  <body>
      <div class="container">
          <img class="logo" src="https://cuvette.tech/assets/images/programPage/cuvetteLogo.png" alt="Cuvette Logo">
          
          <div class="message">New Job Opportunity</div>
          
          <div class="job-card">
              <p>Hello ${jobDetails.recipientName},</p>
              <p>We found a job opportunity that matches your profile!</p>
              
              <div class="job-title">${jobDetails.jobTitle}</div>
              <div class="company-name">${jobDetails.companyName}</div>
              
              <div class="job-details">
                  <p><span class="detail-label">Experience Level:</span> ${
                    jobDetails.experienceLevel
                  }</p>
                  <p><span class="detail-label">Application Deadline:</span> ${
                    jobDetails.applicationDeadline
                  }</p>
                  <p><span class="detail-label">Job Description:</span></p>
                  <p>${jobDetails.jobDescription}</p>
              </div>
              
              <a href="https://cuvette.tech/app/dashboard/other-jobs"
               class="cta-button">Apply Now</a>
          </div>
          
          <div class="footer">
              <p>This email was sent by ${jobDetails.companyName}</p>
              <p>If you have any questions, please contact us at <a href="mailto:${
                process.env.SUPPORT_EMAIL || "support@cuvette.com"
              }">${process.env.SUPPORT_EMAIL || "support@cuvette.com"}</a></p>
          </div>
      </div>
  </body>
  </html>`;
};
