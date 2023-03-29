import { check } from "express-validator"

export const mottoStoreValidate = [
    check("name").isString(),
]