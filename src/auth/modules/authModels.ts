import { email } from "zod";
import { prisma } from "../../database/prisma";
interface User{
    username:string;
    email:string;
    password:string;
}

interface RefreshToken{
    user_id:number;
    expires_at:Date;
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
const addAuthToken = async(refreshToken:RefreshToken)=>{
    const rows = await prisma.authToken.create({
        data:{
            user_id:refreshToken.user_id,
            expires_at:refreshToken.expires_at,
            token:""
        }
    })
    return rows
}
const deleteSession = async(id:number)=>{
    const rows = await prisma.authToken.delete({where:{id:id}})
    return rows
}
const authModels ={
    registerUser,
    logUser,
    addAuthToken,
    deleteSession,
}

export {User,RefreshToken, authModels }