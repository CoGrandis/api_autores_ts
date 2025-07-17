import { env } from 'src/env.js';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/CustomError';
import { verify } from 'jsonwebtoken';

const privateKey = env.PRIVATE_KEY
function verifyToken (req:Request, res:Response, next:NextFunction ) {
    const headerAuth = req.headers['authorization']
    const token = headerAuth && headerAuth.split(' ')[1];
    if(!token){
        throw new CustomError("Token no Valido", 401);    }
    if(!headerAuth.startsWith("Bearer")){
        throw new CustomError("Token no Valido", 401);
    }
    try {
        const verifyToken = verify(token,privateKey)
        if(verifyToken){
            next()   
        }    
    } catch (error) {
        throw new CustomError("Token no Valido", 401);
     }
 
    

}

export {verifyToken}