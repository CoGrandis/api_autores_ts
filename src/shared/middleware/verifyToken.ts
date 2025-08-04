import { env } from 'src/env';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/CustomError';
import {verify, JwtPayload} from 'jsonwebtoken';
const privateKey = env.PRIVATE_KEY
function verifyToken (req:Request, res:Response, next:NextFunction ) {
        const cookieAuth = req.cookies['accessToken']        
        if(!cookieAuth){
            throw new CustomError("Debe ingresar Token", 403);    

        }
        const token = cookieAuth.split(' ')[1];
        const tokenStart = cookieAuth.split(' ')[0];
        
        if(!token || tokenStart != "Bearer"){
            throw new CustomError("Token no Valido", 401);    
        }
        const verifyToken = verify(token,privateKey)
        if(verifyToken){
            next()   
        }else{
           throw new CustomError("Token no Valido", 401);    
        }

    

}

export {verifyToken}