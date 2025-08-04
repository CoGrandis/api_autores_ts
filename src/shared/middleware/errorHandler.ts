import { TokenExpiredError } from 'jsonwebtoken';
import CustomError from '../utils/CustomError'
import { Request, Response, NextFunction } from 'express';

interface BodyResponse{
    timestamp:Date;
    method:string;
    statusCode:number;
    message:string
}

function errorHandler(err:any, req:Request, res:Response, next:NextFunction){
    const bodyResponse:BodyResponse={
        timestamp:new Date(),
        method: req.method,
        statusCode:500,
        message: err.message
    }
    if(err instanceof CustomError){
        bodyResponse.statusCode = err.status
        bodyResponse.message = err.message
    }
    if(err instanceof TokenExpiredError){
        bodyResponse.statusCode = 401
        bodyResponse.message = err.message
    }
    res.status(bodyResponse.statusCode).json(bodyResponse)
}

export {errorHandler}