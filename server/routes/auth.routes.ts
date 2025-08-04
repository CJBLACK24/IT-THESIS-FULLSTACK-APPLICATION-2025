// server/routes/auth.routes.ts

import { Router } from "express";
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,

} from "../controller/auth.controller";

const router = Router();

// Existing auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// New password‑reset routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);



export default router;
