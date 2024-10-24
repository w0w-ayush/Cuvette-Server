import OTP from "../models/OTP.js";
import User from "../models/User.js";
import { sendErrorResponse } from "./Signup.js";

export const verifyEmail = async (req, res) => {
  try {
    const { otp } = req.body;
    const { email } = req.body || req.user;

    if (!email || !otp) {
      sendErrorResponse(res, 400, "Email and OTP are required");
      return;
    }

    const otpDoc = await OTP.findOne({ email, otp, type: "email" }).sort({
      createdAt: -1,
    });
    if (!otpDoc) {
      sendErrorResponse(res, 400, "Invalid or expired OTP");
      return;
    }

    const user = await User.findOneAndUpdate(
      { email },
      { isEmailVerified: true },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Email verification failed. Please try again.",
    });
  }
};

export const verifyPhone = async (req, res) => {
  try {
    const { otp } = req.body;
    const { phone } = req.body || req.user;

    if (!phone || !otp) {
      sendErrorResponse(res, 400, "Phone and OTP are required");
      return;
    }

    const otpDoc = await OTP.findOne({ phone, otp, type: "phone" }).sort({
      createdAt: -1,
    });
    if (!otpDoc) {
      sendErrorResponse(res, 400, "Invalid or expired OTP");
      return;
    }

    const user = await User.findOneAndUpdate(
      { phone },
      { isPhoneVerified: true },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Phone verified successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Phone verification failed. Please try again.",
    });
  }
};
