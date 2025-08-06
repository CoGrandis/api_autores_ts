import { Session, User, authModels} from "./authModels";
import { Response, Request } from "express";
import { env } from "src/env";
import bcrypt from "bcrypt";
import jwt, { verify , JwtPayload} from 'jsonwebtoken';
import CustomError from "@utils/CustomError";
0
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
        res.status(200).json({message:"Usuario Registrado Correctamente"})
    } catch (error) {
        if(error instanceof Error){
            throw new CustomError(error.message,500)
        }
    }
}

const loginUser =  async (req:Request, res:Response) => {
    const username:string = req.body.username
    const password = req.body.password
    const user = await authModels.logUser(username)
    if(!user){
        throw new CustomError("Usuario no encontrado",404)
    }
    const verificarContraseña = await bcrypt.compare(password, user.password)
    if(!verificarContraseña){
        throw new CustomError("Contraseña incorrecta",401)

    }

    const expires:Date = new Date();
    expires.setDate(expires.getDate()+7)

    const newSession:Session={
        expires_at:expires,
        status:"Active",
        user_id: user.id,
        created_at: new Date()
    }
    const session = await authModels.createSession(newSession)

    const accessToken = jwt.sign({ id: user.id, username : user.username }, privateKey, { expiresIn: '10s' });
    const refreshToken = jwt.sign({ id: session.id, user_id:user.id }, privateKey, { expiresIn: '2d' });

    res.cookie('accessToken', `Bearer ${accessToken}`, {httpOnly: true,sameSite: true})
    res.cookie('refreshToken', `Bearer ${refreshToken}`, {httpOnly: true,sameSite: true})
    res.json({message:"Sesion Iniciada Correctamente"}) 

}

const logoutUser = async (req:Request, res:Response) => {
    const refreshToken = req.cookies["refreshToken"].split(' ')[1];
    try {
    const payload =verify(refreshToken, privateKey) as JwtPayload;
    const id = payload.id
    await authModels.deleteSession(id);
    res.clearCookie('accessToken', { httpOnly: true }); 
    res.clearCookie('refreshToken', { httpOnly: true });
    res.status(200).json({message:"Sesión cerrada correctamente"})        
    } catch (error:any) {
        if(error instanceof Error){
            throw new CustomError(error.message,500)
        }
    }       
}
export const authController = {
    registerUser, 
    loginUser,
    logoutUser
}