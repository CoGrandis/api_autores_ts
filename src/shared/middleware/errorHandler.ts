import CustomError from '../utils/CustomError'
import { Request, Response, NextFunction } from 'express';

function errorHandler(err:CustomError, req:Request, res:Response, next:NextFunction){
    const bodyResponse={
        timestamp:new Date(),
        method: req.method,
        statusCode:500,
        message: err.message
    }
    if(err instanceof CustomError){
        bodyResponse.statusCode = err.status
        bodyResponse.message = err.message
    }
    res.status(err.status).json(bodyResponse)
}

export {errorHandler}