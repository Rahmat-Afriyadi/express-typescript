import { Prisma } from "@prisma/client";
import { Request } from "express";
import { WithUserRequest } from "../interfaces/user-request.interface";
import CreateMottoType from "../types/motto/create-motto.type";
import { db } from "../utils/prisma.utils";

export const createMotto = async (motto : CreateMottoType, req:Request) : Promise<[data:any, error:any]> => {
    try {

        let data : Prisma.MottoUncheckedCreateInput
        data = {
            name:motto.name,
            user_id:(req as WithUserRequest).user.id,
        }
        const newMotto = await db.motto.create({data})

        return [newMotto,null]
        
    } catch (error) {
        return [null, error]
    }
    
}

export const userMottoService = async (req:Request) : Promise<[data:any, err:any]> => {
    try {
        const mottos = await db.motto.findMany({
            where: {
                user_id: (req as WithUserRequest).user.id
            },
        })
        return [mottos,null]
    } catch (error) {
        return [null, error]
    }
} 