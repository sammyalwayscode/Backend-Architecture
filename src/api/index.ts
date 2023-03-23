import { Router } from "express";
import homeRoute from "../routes/home.route";
import authRoute from "../routes/auth.route";

const router = Router();

router.use("/", homeRoute);
router.use("/auth", authRoute);

export default router;
