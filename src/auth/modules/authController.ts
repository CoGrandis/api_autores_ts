import { User, authModels, Session} from "./authModels";
import { Response, Request } from "express";
import { env } from "src/env";
import bcrypt from "bcrypt";
import jwt, { verify , JwtPayload} from 'jsonwebtoken';
import CustomError from "@utils/CustomError";
import tr from "zod/v4/locales/tr.cjs";

const privateKey = env.PRIVATE_KEY;
const registerUser = async(req:Request, res:Response)=>{
    try {
        const {username, email, password}= req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user:User ={
            username:username,
            email:email,
            password:hashedPassword
        }
        const result = await authModels.registerUser(user)
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

const loginUser =  async (req:Request, res:Response) => {
    const username:string = req.body.username
    const password = req.body.password
    const result = await authModels.logUser(username)
    if(!result){
        throw new CustomError("Usuario no encontrado",404)
    }
    const verificarContraseña = await bcrypt.compare(password, result.password)
    if(!verificarContraseña){
        throw new CustomError("Contraseña incorrecta",401)

    }

    const expires:Date = new Date();
    expires.setDate(expires.getDate()+7)
    const newSession:Session={
        user_id:result.id,
        expires_at: expires,
        created_at: new Date()
    }
    const session = await authModels.createSession(newSession)


    const accessToken = jwt.sign({ id: result.id, username : result.username }, privateKey, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: session.id }, privateKey, { expiresIn: '7d' });


    res.cookie('accessToken', `Bearer ${accessToken}`, {
        httpOnly: true,
        maxAge:1000*60*15,
    })
    res.cookie('refreshToken', `Bearer ${refreshToken}`, {
        httpOnly: true,
        maxAge:1000*60*60*24*7,
    })

    res.json({Access_Token:`Bearer ${accessToken}`}) 

}

const logoutUser = async (req:Request, res:Response) => {
    const refreshToken = req.cookies["refreshToken"].split(' ')[1];
    try {
    const payload =verify(refreshToken, privateKey) as JwtPayload;
    console.log(payload)
    const id = payload.id
    await authModels.deleteSession(id);
    res.clearCookie('accessToken', { httpOnly: true }); 
    res.clearCookie('refreshToken', { httpOnly: true });
    res.status(200).json({message:"Sesión cerrada correctamente"})        
    } catch (error:any) {
        console.log(error)
    }
}
export const authController = {
    registerUser, 
    loginUser,
    logoutUser
}