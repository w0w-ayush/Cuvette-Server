export const userRoute = async (req, res) => {
  try {
    // Extract the Authorization header
    const authHeader = req.headers.authorization; // Case-insensitive header check

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(403).json({ message: "User not logged in" });
      return; // Exit after sending the response
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(403).json({ message: "User not logged in" });
      return; // Exit if no token is found
    }

    // Send user data if the token is valid
    res.status(200).json({
      //@ts-ignore - Ignoring TypeScript error for `req.user` if it's not typed
      data: req.user,
    });
  } catch (error) {
    console.error("Error in userRoute: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
