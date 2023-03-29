import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { sendEmailService } from "../services/email.service";
import EmailSend from "../types/email.type";

export const emailContactController = async (req:Request, res:Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    try {
        const email : EmailSend = req.body
        const [data, err] = await sendEmailService(email)
        if (err !== null) {
            res.json({data:null,message:err})
        }

        res.json({data:data, message:"email berhasil dibuat"})
        
    } catch (error) {
        
        res.json({data:null, message:error})
    }

}