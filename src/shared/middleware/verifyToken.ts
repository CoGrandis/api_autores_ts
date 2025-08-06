import { env } from 'src/env';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/CustomError';
import { authModels, Session, UpdateSession } from 'src/auth/modules/authModels';
import jwt,{verify, JwtPayload, TokenExpiredError} from 'jsonwebtoken';
const privateKey = env.PRIVATE_KEY
async function verifyToken (req:Request, res:Response, next:NextFunction ) {    
    const cookieAuth = req.cookies['accessToken']        
    const refreshTokenCookie = req.cookies['refreshToken']

    if(!cookieAuth || !refreshTokenCookie){
        throw new CustomError("Debe ingresar Token", 401);  

    }
    const token = cookieAuth.split(' ')[1];
    const tokenStart = cookieAuth.split(' ')[0];
    const refreshToken = refreshTokenCookie.split(' ')[1]
    
    if(!token || tokenStart != "Bearer"){
        throw new CustomError("Token no Valido", 401);    
    }

    const refreshPayload =  verify(refreshToken, privateKey) as JwtPayload;        
    const sessionId = refreshPayload.id;
    const session = await authModels.getSession(sessionId);
    if (!session) {
        throw new CustomError("Sesión no encontrada", 404);
    }
    verify(token,privateKey, async function (error:any, payload:any){
        if(error && error.name == "TokenExpiredError"){
            console.log("JWT expiro")
            const expires:Date = new Date();
            expires.setDate(expires.getDate()+7);
            const newSession:UpdateSession = {
                created_at: new Date(),
                expires_at: expires,
            }
        
            await authModels.updateSession(sessionId, newSession);

            const newAccessToken = jwt.sign({ id: payload.user_id, }, privateKey, { expiresIn: '10s' });
            const newRefreshToken = jwt.sign({id: payload.id, user_id:payload.user_id }, privateKey, { expiresIn: '2d' });
            res.cookie('accessToken', `Bearer ${newAccessToken}`,{httpOnly: true,sameSite: true})
            res.cookie('refreshToken',`Bearer ${newRefreshToken}`,{httpOnly: true,sameSite: true})
            return next()

        }
        if(payload){
            next()
        }
    })

}

export {verifyToken}