import { body } from "express-validator"

export const projectStoreValidate = [
    body('date').not().isEmpty().isISO8601().toDate(),
    body("name").not().isEmpty().isString(),
    body("desc").not().isEmpty().isString(),
    body("name").not().isEmpty().isString(),
    body("image").not().isEmpty(),
]