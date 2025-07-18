import { email } from "zod";
import { prisma } from "../../database/prisma";
interface User{
    username:string;
    email:string;
    password:string;
}

const registerUser = async (user:User) => {
    const rows =  await prisma.user.create({
        data:{
            username:user.username,
            email:user.email,
            password:user.password
        }
    })
    return rows
}

const logUser = async (username:string) => {
    const rows = await prisma.user.findFirst({where:{username:username}})
    return rows
}
const authModels ={
    registerUser,
    logUser
}

export {User, authModels}