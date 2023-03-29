import express from "express";
import { emailContactController } from "../controllers/email.controller";
import { emailContactValidate } from "../validation/email.validation";

export const emailRouter = express.Router();

emailRouter.post(
  "/message-contact",
  ...emailContactValidate,
  emailContactController
);

