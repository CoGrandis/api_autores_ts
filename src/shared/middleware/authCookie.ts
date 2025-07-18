import CustomError from '@utils/CustomError';
import { env } from 'src/env';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
export function authCookie(req:Request, res:Response, next:NextFunction){
    try {
            const cookie = req.cookies['authcookie']
    if(!cookie){
        throw new CustomError('',401)
    }
    const verify = jwt.verify(cookie, env.PRIVATE_KEY)
    if(verify){
        next()
    }
    } catch (error) {
        console.log(error)
    }

}
