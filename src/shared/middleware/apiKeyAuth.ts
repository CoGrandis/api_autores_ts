import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express';
import {env} from '../../env'
dotenv.config();
const validApiKey = env.API_KEY;

function apiKeyAuth(req:Request, res:Response, next:NextFunction){
    const apik = req.headers['x-api-key'];
    if(apik && apik === validApiKey){
        next();
    }else{
        res.status(401).json({error : 'Api KEY Invalida'});
    }
}

export {apiKeyAuth}