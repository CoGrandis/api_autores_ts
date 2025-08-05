import { email } from "zod";
import { prisma } from "../../database/prisma";
interface User{
    username:string;
    email:string;
    password:string;
}

interface Session{
    user_id:number;
    expires_at:Date;
    status:string;
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
const createSession = async(session:Session)=>{
    const rows = await prisma.session.create({
        data:{
            user_id:session.user_id,
            expires_at:session.expires_at,
            status:session.status
        }
    })
    return rows
}
const deleteSession = async(id:number)=>{
    const rows = await prisma.session.delete({where:{id:id}})
    return rows
}

const getSession = async (id:number) => {
    const rows = await prisma.session.findFirst({where:{id:id}})
    return rows
}
const authModels ={
    registerUser,
    logUser,
    createSession,
    getSession,
    
}
export {User, Session, authModels }