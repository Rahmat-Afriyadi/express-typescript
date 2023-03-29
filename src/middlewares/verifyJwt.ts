import { NextFunction, Request, Response } from "express"
import { WithUserRequest } from "../interfaces/user-request.interface";

const jwt = require("jsonwebtoken")

export const verifyJWT = (req:Request, res:Response, next : NextFunction) => {
  const authHeader : String = req.headers.authorization || "" 

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" })
  }
  
  const token = authHeader.split(" ")[1]

  const decoded = jwt.verify(token, process.env.JWT_PRIVATE_SECRET);
  (req as WithUserRequest).user = decoded;
  next()

}

