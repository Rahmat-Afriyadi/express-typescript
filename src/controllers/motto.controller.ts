import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { createMotto, userMottoService } from "../services/motto.service";
import CreateMottoType from "../types/motto/create-motto.type";

export const storeMottoController = async (req:Request, res:Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    try {   
        const project : CreateMottoType = req.body
        const [data, err] = await createMotto(project,req)
        if (err !== null) {
            res.json({data:null,message:err})
        }
        res.json({data:data, message:"motto berhasi dibuat"})
    } catch (error) {
        res.json({data:null, message:error})
    }

}

export const indexMottoController = async (req:Request, res:Response) => {
    try {
        const mottos = await userMottoService(req)
        res.json({data:mottos, message:"Data found"})
    } catch (error) {
        res.json({data:null, message:error})
    }
}