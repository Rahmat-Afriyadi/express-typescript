import { Prisma } from "@prisma/client";
import { Request } from "express";
import { WithUserRequest } from "../interfaces/user-request.interface";
import CreateSkill from "../types/skill/create-skill.type";
import { db } from "../utils/prisma.utils";

export const createSkill = async (skill : CreateSkill, req:Request) : Promise<[data:any, error:any]> => {
    try {
        let data : Prisma.SkillCreateInput
        data = {
                name:skill.name,
                month_exp:skill.month_exp,
                User: {
                    connect : {
                        id:(req as WithUserRequest).user.id
                    }
                }
            }
        const newSkill = await db.skill.create({data})

        return [newSkill,null]
        
    } catch (error) {
        return [null, error]
    }
    
}

export const userSkillService = async (req:Request) : Promise<[data:any, err:any]> => {
    try {
        const skills = await db.skill.findMany({
            where: {
                user_id: (req as WithUserRequest).user.id
            },
            include: {
                ProjectSkill: true
            }
        })
        return [skills,null]
    } catch (error) {
        return [null, error]
    }
}

