export default function verificationEmail(otp) {
  return `<!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="UTF-8">
      <title>Verify Your Email Address</title>
      <style>
          body {
              background-color: #ffffff;
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.4;
              color: #333333;
              margin: 0;
              padding: 0;
          }
  
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              text-align: center;
          }
  
          .logo {
              max-width: 150px;
              margin-bottom: 20px;
          }
  
          .message {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
              color: #2D3748;
          }
  
          .verification-card {
              background-color: #F7FAFC;
              border-radius: 10px;
              padding: 30px;
              margin: 20px 0;
              text-align: center;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
  
          .welcome-text {
              font-size: 18px;
              color: #4A5568;
              margin-bottom: 20px;
          }
  
          .verification-button {
              display: inline-block;
              padding: 14px 30px;
              background-color: #4299E1;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              font-size: 16px;
              font-weight: bold;
              margin: 20px 0;
              transition: background-color 0.3s;
          }
  
          .verification-button:hover {
              background-color: #2B6CB0;
          }
  
          .note {
              font-size: 14px;
              color: #718096;
              margin: 20px 0;
          }
  
          .footer {
              margin-top: 30px;
              font-size: 14px;
              color: #718096;
              border-top: 1px solid #E2E8F0;
              padding-top: 20px;
          }
  
          .highlight {
              color: #4299E1;
              font-weight: bold;
          }
      </style>
  </head>
  
  <body>
      <div class="container">
          <img class="logo" src="https://cuvette.tech/assets/images/programPage/cuvetteLogo.png" alt="Cuvette Logo">
          <div class="message">Verify Your Email Address</div>
          
          <div class="verification-card">
              <p class="welcome-text">Dear User,</p>
              <p>Welcome to Cuvette! We're excited to have you on board.</p>
              <p>Please verify to get started:</p>
              
              <p> Your OTP is : <h2>${otp}</h2> </p>
              
              <p class="note">This OTP will expire in 24 hours.</p>
              
              <div class="note">
                  <p>If you didn't create an account with Cuvette, you can safely ignore this email.</p>
              </div>
          </div>
          
          <div class="footer">
              <p>© ${new Date().getFullYear()} Cuvette. All rights reserved.</p>
              <p>If you have any questions, please contact us at <a href="mailto:support@cuvette.com">support@cuvette.com</a></p>
          </div>
      </div>
  </body>
  </html>`;
}
