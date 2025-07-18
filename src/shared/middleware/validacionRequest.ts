import CustomError from '../utils/CustomError'
import z from 'zod'
import { Request, Response, NextFunction } from 'express';


const requestParamIdValidate = (schema:z.ZodType)=>{
    return (req:Request, res: Response, next:NextFunction) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      throw new CustomError(result.error.issues[0].message, 400)
    }
    next(); 
    }
}
const bodyParamValidate = (schema:z.ZodType)=>{
    return (req:Request, res: Response, next:NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw new CustomError(result.error.message, 400)

    }
    next(); 
    }
}

const requestQueryValidate = (schema:z.ZodType)=>{
    return (req:Request, res: Response, next:NextFunction) => {
      console.log(req.query)
    const result = schema.safeParse(req.query);
    if (!result.success) {
      throw new CustomError(result.error.message, 400)

    }
  next(); 
    }
}
export {requestParamIdValidate, bodyParamValidate, requestQueryValidate}