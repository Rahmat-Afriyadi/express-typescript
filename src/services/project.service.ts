import { Prisma } from "@prisma/client";
import { Request } from "express";
import { UrlWithParsedQuery } from "url";
import { WithUserRequest } from "../interfaces/user-request.interface";
import CreateProject from "../types/project/create.type";
import { db } from "../utils/prisma.utils";

export const createProject = async (project : CreateProject, req:Request) : Promise<[data:any, error:any]> => {
    try {

        let data : Prisma.ProjectUncheckedCreateInput
        data = {
            name:project.name,
            desc:project.desc,
            image:project.image,
            date:new Date(project.date),
            user_id:(req as WithUserRequest).user.id,
        }
        const newProject = await db.project.create({data})

        await db.projectSkill.createMany({
                data:project.skills.map(e=>{return{project_id:newProject.id,skill_id:e}}),
                skipDuplicates: true
        })

        return [newProject,null]
        
    } catch (error) {
        return [null, error]
    }
    
}

export const userProjectService = async (req:Request) : Promise<[data:any, err:any]> => {
    try {
        const projects = await db.project.findMany({
            where: {
                user_id: (req as WithUserRequest).user.id
            },
            include: {
                ProjectSkill: true
            }
        })
        return [projects,null]
    } catch (error) {
        return [null, error]
    }
} 