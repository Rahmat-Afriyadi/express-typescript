import express from "express";
import { registerController, loginController } from "../controllers/auth.controller";
import { regisValidate } from "../validation/auth/regis.validation";
import { loginValidate } from "../validation/auth/login.validation";

export const authRouter = express.Router();

authRouter.post(
  "/register",
  ...regisValidate,
  registerController
);

authRouter.post(
  "/login",
  ...loginValidate,
  loginController
);

