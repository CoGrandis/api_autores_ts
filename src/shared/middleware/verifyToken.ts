import { env } from 'src/env';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/CustomError';
import jwt, {verify, JwtPayload} from 'jsonwebtoken';
import { authModels, Session } from 'src/auth/modules/authModels';
const privateKey = env.PRIVATE_KEY
function verifyToken (req:Request, res:Response, next:NextFunction ) {
        const cookieAuth = req.cookies['accessToken']        
        const refreshTokenCookie = req.cookies['refreshToken']

        if(!cookieAuth || !refreshTokenCookie){
            throw new CustomError("Debe ingresar Token", 403);    

        }
        const token = cookieAuth.split(' ')[1];
        const tokenStart = cookieAuth.split(' ')[0];
        
        if(!token || tokenStart != "Bearer"){
            throw new CustomError("Token no Valido", 401);    
        }
        verify(token,privateKey, async function(err:any, payload:any){
            if (err && err.name === 'TokenExpiredError') {
                const refreshTokenCookie = req.cookies['refreshToken']
                
                    const token = refreshTokenCookie?.split(' ')[1];
                    const payload = verify(token,privateKey) as JwtPayload;
                    if(!payload){
                        throw new CustomError("Refresh Token no Valido", 401);
                    }
                
                    //Sesión 
                    const sessionId = payload.id;
                    const session = await authModels.getSession(sessionId);
                    if (!session) {
                        throw new CustomError("Sesión no encontrada", 404);
                    }
                    const expires:Date = new Date();
                    expires.setDate(expires.getDate()+7);
                    const newSession:Session = {
                        created_at: new Date(),
                        expires_at: expires,
                        user_id: session.user_id
                    }
                
                    await authModels.updateSession(sessionId, newSession);
                
                    const newAccessToken = jwt.sign({ id: session.user_id }, privateKey, { expiresIn: '15m' });
                    const newRefreshToken = jwt.sign({ id: session.id }, privateKey, { expiresIn: '7d' });
                
                    res.cookie('accessToken', `Bearer ${newAccessToken}`, {
                        httpOnly: true,
                        maxAge: 1000 * 60 * 15, 
                    });
                    res.cookie('refreshToken', `Bearer ${newRefreshToken}`, {
                        httpOnly: true,
                        maxAge: 1000 * 60 * 60 * 24 * 7,
                    });
            }
            if (payload){
            next();

            }
        });
    }


export {verifyToken}