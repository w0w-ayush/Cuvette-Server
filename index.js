import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/auth.js";
import { jobRoutes } from "./routes/job.js";
import { dbConnect } from "./config/db.js";
import { userRoutes } from "./routes/user.js";

const applicationBaseUrl = process.env.APPLICATION_BASE_URL || "";

const app = express();
const corsOptions = {
  origin: [applicationBaseUrl, "http://localhost:5173"],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};
const port = process.env.PORT || 4000;

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/auth", userRoutes);

dbConnect();

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
