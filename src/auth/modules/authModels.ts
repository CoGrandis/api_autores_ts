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
    created_at:Date;    
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
const createSession = async (session:Session) => {
    const rows = await prisma.session.create({
        data:{
            expires_at: session.expires_at,
            user_id: session.user_id,
            created_at: new Date()
        }
    })
    return rows
}

const updateSession = async (id:number, session:Session) => {
    const rows = await prisma.session.update({
        where:{id:id},
        data:{
            expires_at: session.expires_at,
            user_id: session.user_id,
            created_at: new Date()
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
    deleteSession,
    createSession,
    updateSession,
    getSession
}

export {User,Session, authModels }