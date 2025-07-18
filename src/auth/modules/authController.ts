import { User, authModels } from "./authModels";
import { Response, Request } from "express";
import { env } from "src/env";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import CustomError from "@utils/CustomError";

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
        var token = jwt.sign({ id: result.id, username : result.username }, privateKey, { expiresIn: '1h' });
        res.json({token:`Bearer ${token}`}) 
       

}
export const authController = {
    registerUser, 
    loginUser
}