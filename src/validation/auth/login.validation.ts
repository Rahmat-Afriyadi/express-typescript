import { body } from "express-validator"

export const loginValidate = [
    body("email").isString().isEmail(),
    body("password").isString(),
]