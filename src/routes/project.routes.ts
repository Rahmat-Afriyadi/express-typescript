import express from "express";
import { storeProjectController } from "../controllers/project.controller";
import { verifyJWT } from "../middlewares/verifyJwt";
import { uploadImageDisk } from "../upload/single.upload";
import { projectStoreValidate } from "../validation/project/project-store.validation";

export const projectRouter = express.Router();

projectRouter.post(
  "/",
  verifyJWT,
  ...projectStoreValidate,
  uploadImageDisk,
  storeProjectController
);


