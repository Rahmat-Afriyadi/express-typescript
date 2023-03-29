import express from "express"
import { storeSkillController, indexSkillController } from "../controllers/skill.controller"
import { verifyJWT } from "../middlewares/verifyJwt"
import { skillStoreValidate } from "../validation/skill/skill-store.validation"

export const skillRouter = express.Router()

skillRouter.post("/",
    ...skillStoreValidate,
    verifyJWT,
    storeSkillController
)

skillRouter.get("/",
    verifyJWT,
    indexSkillController
)