import { env } from 'src/env';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/CustomError';
import { verify } from 'jsonwebtoken';

const privateKey = env.PRIVATE_KEY
function verifyToken (req:Request, res:Response, next:NextFunction ) {
    const headerAuth = req.headers['authorization']
    if(!headerAuth){
        throw new CustomError("Debe ingresar Token", 401);    

    }
    const token = headerAuth.split(' ')[1];
    const tokenStart = headerAuth.split(' ')[0];
    
    if(!token){
        throw new CustomError("Token no Valido", 401);    
    }
    if(tokenStart != "Bearer"){
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