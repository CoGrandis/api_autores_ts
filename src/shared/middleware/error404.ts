import { Response, Request, NextFunction } from "express"
import CustomError from "@utils/CustomError"
export const error404 = async (req:Request, res:Response, next:NextFunction) => {
    throw new CustomError("Pagina no encontrada",404)
    
}