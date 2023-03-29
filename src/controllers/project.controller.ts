import { validationResult } from "express-validator/src/validation-result";
import { Request, Response } from "express";
import CreateProject from "../types/project/create.type";
import { createProject, userProjectService } from "../services/project.service";

export const storeProjectController = async (req:Request, res:Response) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    try {
        const project : CreateProject = req.body
        const [data, err] = await createProject(project,req)
        console.log(err)
        if (err !== null) {
            res.json({data:null,message:err})
        }

        res.json({data:data, message:"project berhasi dibuat"})
        
    } catch (error) {
        
        res.json({data:null, message:error})
    }
}

export const indexProjectController = async (req:Request, res:Response) => {
    try {
        const projects = await userProjectService(req)
        res.json({data:projects, message:"Data found"})
    } catch (error) {
        res.json({data:null, message:error})
    }
}