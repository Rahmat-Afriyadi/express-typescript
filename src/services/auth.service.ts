import Register from "../types/auth/register.type"
import { Prisma } from "@prisma/client";
import { db } from "../utils/prisma.utils";
import Login from "../types/auth/login.type";
import { signJWT } from "../utils/jwt.utils";
import bcrypt from  "bcrypt"

export const RegisterService = async (register : Register) : Promise<[data: any, err: any]> => {
        try {
            const hashPassword = await bcrypt.hash(register.password, 10)

            let account : Prisma.AccountCreateInput

            account = {
                email:register.email,
                password:hashPassword,
                User: {
                    create: {
                        name: register.name,
                        birth_date: register.birthDate
                    }
                }
            }
            const createAccount = await db.account.create({data:account})
            return [createAccount, null]
        } catch (error) {
            return [null, error];
            
        }
    }

export const LoginService = async (login:Login) : Promise<[data: any, err: any]> => {
    try {
        const account = await db.account.findUnique(
            {
                where:{
                    email:login.email
                },
                include: {
                    User: true,
                }
            })
        
        if (account == null) {
            return [null,"Account tersebut tidak ada"]
        }

        if (!await bcrypt.compare(login.password, account.password)) {
            return [null, "Password tersebut salah"]
        }

        const accessToken = signJWT({ email: account?.email, name: account?.User?.name, id: account?.id },"5d");

        const refreshToken = signJWT({ id: account?.id }, "1y");

        return [{accessToken,refreshToken,account}, null]

    } catch (error) {
        return [null,error]
    }
}