import { Router } from "express";
import { login, register } from "../controller/user.controller";
import {
  loginValidation,
  registerValidation,
} from "../middlewares/validator/userValidation/userValidation";

const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

export default router;
