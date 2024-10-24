import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String },
  phone: { type: String },
  otp: { type: String, required: true },
  type: { type: String, enum: ["email", "phone"], required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // OTP expires after 5 minutes
});

// Export the OTP model
export default mongoose.model("OTP", otpSchema);
