import { env } from 'src/env';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/CustomError';
import {verify, decode, JwtPayload} from 'jsonwebtoken';

const privateKey = env.PRIVATE_KEY
function refreshAccessToken (req:Request, res:Response, next:NextFunction ) {
    const token = req.cookies['refreshtoken']
    const decoded = verify(token,privateKey) as JwtPayload;
    console.log(decoded.id)

}

export {refreshAccessToken}