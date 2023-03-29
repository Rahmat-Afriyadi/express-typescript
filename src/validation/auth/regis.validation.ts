import { check, body } from "express-validator"

export const regisValidate = [
    check('birthDate').isISO8601().toDate(),
    body("email").isString().isEmail(),
    body("password").isString(),
    body("name").isString(),
]