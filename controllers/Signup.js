import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import mailSender from "../utils/mailSender.js";
import smsSender from "../utils/smsSender.js";
import verificationEmail from "../mail/templates/verifyEmail.js";
import OTP from "../models/OTP.js";
import User from "../models/User.js";

export const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      companyName,
      employeeSize,
      phone,
    } = req.body;

    // Validation
    if (
      !name ||
      !email ||
      !password ||
      !employeeSize ||
      !companyName ||
      !phone
    ) {
      sendErrorResponse(res, 403, "All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      sendErrorResponse(
        res,
        400,
        "Password and Confirm Password do not match."
      );
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      sendErrorResponse(
        res,
        400,
        "User already exists. Please sign in to continue."
      );
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      phone,
      companyName,
      employeeSize,
      password: hashedPassword,
    });

    // Send OTPs
    const emailRes = await sendEmailOTP(email);
    // if (!emailRes.success) {
    //   sendErrorResponse(
    //     res,
    //     500,
    //     emailRes.message || "Error in Sending Email OTP"
    //   );
    //   return;
    // }

    const phoneRes = await sendPhoneOTP(phone);
    // if (!phoneRes.success) {
    //   sendErrorResponse(
    //     res,
    //     500,
    //     phoneRes.message || "Error in Sending Phone OTP"
    //   );
    //   return;
    // }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    res.status(200).json({
      success: true,
      user,
      token,
      message:
        "User registered successfully. Please verify your email and phone.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};

// Function to send error responses
export const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

const sendEmailOTP = async (email) => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  await OTP.create({ email, otp, type: "email" });

  const emailResult = await mailSender(
    email,
    "Verify your email",
    verificationEmail(otp)
  );

  if (!emailResult.success) {
    console.error("Failed to send email:", emailResult.message);
    return { success: false, message: "Failed to send verification email." };
  }

  return { success: true };
};

const sendPhoneOTP = async (phone) => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  await OTP.create({ phone, otp, type: "phone" });

  // const smsResult = await smsSender(phone, `Your OTP is: ${otp}`);

  // if (!smsResult.success) {
  //   console.error("Failed to send SMS:", smsResult.message);
  //   return { success: false, message: "Failed to send verification SMS." };
  // }

  return { success: true };
};
