import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

export const auth = async (req, res, next) => {
  try {
    // Extracting JWT from request cookies, body, or headers
    // console.log("Cookies:", req.cookies);
    // console.log("Body:", req.body);
    // console.log("Headers:", req.headers);

    const token =
      req.cookies.token ||
      req.body.token ||
      req.headers.authorization?.split(" ")[1];

    // console.log("Token:", token);

    // If JWT is missing, return 401 Unauthorized response
    if (!token) {
      res.status(401).json({ success: false, message: "Token Missing" });
      return; // End execution here
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      res.status(500).json({
        success: false,
        message: "Server error: JWT secret is not defined.",
      });
      return; // End execution here
    }

    try {
      // Verifying the JWT using the secret key stored in environment variables
      const decode = jwt.verify(token, secret); // Cast to a more specific type if known
      // console.log("Decoded token:", decode);
      const userData = await User.findById(decode.userId);

      // console.log("User data:", userData);

      // Store the decoded JWT payload in the request object for further use
      // @ts-ignore
      req.user = userData; // Now TypeScript knows that req.user exists

      // Optionally, check if the user exists in the database
      //@ts-ignore
      const user = await User.findById(userData._id); // Assuming _id is in the token
      if (!user) {
        res.status(401).json({ success: false, message: "User not found" });
        return; // End execution here
      }
    } catch (error) {
      console.error("JWT verification error:", error);
      res.status(401).json({ success: false, message: "Token is invalid" });
      return; // End execution here
    }

    // If JWT is valid, move on to the next middleware or request handler
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};
