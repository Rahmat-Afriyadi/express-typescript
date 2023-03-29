import express from "express"
import { storeMottoController, indexMottoController } from "../controllers/motto.controller"
import { verifyJWT } from "../middlewares/verifyJwt"
import { mottoStoreValidate } from "../validation/motto/motto-store.validation"

export const mottoRouter = express.Router()

mottoRouter.post("/",
    ...mottoStoreValidate,
    verifyJWT,
    storeMottoController
)

mottoRouter.get("/",
    verifyJWT,
    indexMottoController
)