import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import RequestUser from "../types/auth/requestUser.types";

export interface WithUserRequest extends Request {
    user: RequestUser;
}
