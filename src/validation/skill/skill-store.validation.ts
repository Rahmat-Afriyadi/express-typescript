import { body, check } from "express-validator"

export const skillStoreValidate = [
    check("name").isString(),
    check("month_exp").isNumeric(),
]