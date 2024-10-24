import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email or password is missing
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Please provide both email and password",
      });
      return;
    }

    // Find user with provided email
    const user = await User.findOne({ email });

    // If user not found with provided email
    if (!user) {
      res.status(401).json({
        success: false,
        message: "User not found. Please sign up to continue",
      });
      return;
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }

    // Uncomment this if you want to check email verification
    // if (!user.isEmailVerified) {
    //   res.status(403).json({
    //     success: false,
    //     message: "Please verify your email before logging in",
    //   });
    //   return;
    // }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    // Update user's token in the database
    user.token = token;
    await user.save();

    // Set cookie for token and return success response
    res
      .cookie("token", token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      })
      .status(200)
      .json({
        success: true,
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          email: user.email,
          phone: user.phone,
          isEmailVerified: user.isEmailVerified,
          isPhoneVerified: user.isPhoneVerified,
        },
        message: "Login successful",
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during login. Please try again.",
    });
  }
};

export default login;
