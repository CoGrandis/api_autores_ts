import CustomError from '../utils/CustomError'
import z from 'zod'
import { Request, Response, NextFunction } from 'express';

type RouteHandler ={
  req:Request;
  res:Response;
  next:NextFunction;
}

const requestParamIdValidate = (schema:z.ZodType)=>{
    return (routeHandler: RouteHandler) => {
    const result = schema.safeParse(routeHandler.req.params);
    if (!result.success) {
      throw new CustomError(result.error.issues[0].message, 400)
    }
    routeHandler.next(); 
    }
}
const bodyParamValidate = (schema:z.ZodType)=>{
    return (routeHandler: RouteHandler) => {
    const result = schema.safeParse(routeHandler.req.body);
    if (!result.success) {
      throw new CustomError(result.error.message, 400)

    }
    routeHandler.next(); 
    }
}

const requestQueryValidate = (schema:z.ZodType)=>{
    return (routeHandler: RouteHandler) => {
    const result = schema.safeParse(routeHandler.req.query);
    if (!result.success) {
      throw new CustomError(result.error.message, 400)

    }
    routeHandler.next(); 
    }
}
export {requestParamIdValidate, bodyParamValidate, requestQueryValidate}