import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnect = () => {
  const mongoDBUrl = process.env.MONGODB_URL;
  if (!mongoDBUrl) {
    console.error("MONGODB_URL is not defined in the environment variables");
    process.exit(1);
  }

  mongoose
    .connect(mongoDBUrl)
    .then(() => {
      console.log("DB Connection successful");
    })
    .catch((err) => {
      console.log("Issue in DB Connection");
      console.error(err.message);
      //console.log(`Error in connection: ${err.message}`)
      process.exit(1);
    });
};
