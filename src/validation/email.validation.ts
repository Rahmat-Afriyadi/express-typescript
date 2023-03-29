import { body } from "express-validator"

export const emailContactValidate = [
    body("name").isString(),
    body("from").isString().isEmail(),
    body("text").isString(),
    body("subject").isString(),
]