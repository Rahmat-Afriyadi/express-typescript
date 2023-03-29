import { Request, Response } from "express";
import Register from "../types/auth/register.type";
import { LoginService, RegisterService } from "../services/auth.service";
import { validationResult } from "express-validator/src/validation-result";
import Login from "../types/auth/login.type";

export const registerController = async (req:Request,res:Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    try {
        const Register : Register = req.body
        const [account, err] = await RegisterService(Register)
        if (err !== null) {
            res.json({data:null,message:err})
        }

        res.json({data:account, message:"user berhasi dibuat"})
        
    } catch (error) {
        
        res.json({data:null, message:error})
    }
}

export const loginController = async (req:Request, res:Response) =>  {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    try {
        const Login : Login = req.body
        const [data, err] = await LoginService(Login)

        if (err != null) {
            res.status(403).json({message: err})
        }

          res.cookie("accessToken", data.accessToken, {
            maxAge: 300000, // 5 minutes
            httpOnly: true,
          });

          res.cookie("refreshToken", data.refreshToken, {
            maxAge: 3.154e10, // 1 year
            httpOnly: true,
          });

          res.json({access_token:data.accessToken, message:"login success"})

    } catch (error) {
        res.json({data:null, message:error})
    }
}

