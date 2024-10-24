import express from "express";
import { auth } from "../middlewares/index.js";
import { userRoute } from "../controllers/User.js";

const router = express.Router();

router.get("/me", auth, userRoute);

export const userRoutes = router;
