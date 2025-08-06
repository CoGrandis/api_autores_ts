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
    status:string;
}

interface UpdateSession{
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
const createSession = async(session:Session)=>{
    const rows = await prisma.session.create({
        data:{
            user_id:session.user_id,
            expires_at:session.expires_at,
            created_at: new Date(),
            status:session.status
        }
    })
    return rows
}
const deleteSession = async(id:number)=>{
    const rows = await prisma.session.delete({where:{id:id}})
    return rows
}

const deleteSessionByUserId = async(userid:number)=>{
    const rows = await prisma.session.deleteMany({where:{user_id:userid}})
    return rows
}


const getSession = async (id:number) => {
    const rows = await prisma.session.findFirst({where:{id:id}})
    return rows
}

const updateSession = async (id:number, newsession:UpdateSession) => {
    const rows = await prisma.session.update({
        where:{id:id},
        data:{
            expires_at: newsession.expires_at,
            created_at: new Date()
        }
    })
    return rows
}

const authModels ={
    registerUser,
    logUser,
    createSession,
    getSession,
    deleteSession,
    updateSession,
    deleteSessionByUserId,
}
export {User, Session, UpdateSession,authModels }