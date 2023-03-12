import { Router } from "express";
import homeRoute from "../routes/home.route";

const router = Router();

router.get("/", homeRoute);

export default router;
