import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { createSkill, userSkillService } from "../services/skill.service";
import CreateSkillType from "../types/skill/create-skill.type";

export const storeSkillController = async (req:Request, res:Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    try {   
        const project : CreateSkillType = req.body
        const [data, err] = await createSkill(project,req)
        if (err !== null) {
            res.json({data:null,message:err})
        }
        res.json({data:data, message:"skill berhasi dibuat"})
    } catch (error) {
        res.json({data:null, message:error})
    }

}

export const indexSkillController = async (req:Request, res:Response) => {
    try {
        const skills = await userSkillService(req)
        res.json({data:skills, message:"Data found"})
    } catch (error) {
        res.json({data:null, message:error})
    }
}