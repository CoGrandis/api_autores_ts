import { env } from 'src/env';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/CustomError';
import jwt, {verify, decode, JwtPayload} from 'jsonwebtoken';
import { authModels, Session } from 'src/auth/modules/authModels';
const privateKey = env.PRIVATE_KEY
async function refreshAccessToken (req:Request, res:Response, next:NextFunction ) {
    console.log('refreshToken')
    const refreshTokenCookie = req.cookies['refreshToken']
    if(!refreshTokenCookie){
        throw new CustomError("Refresh Token no encontrado",401)
    }
    const refreshToken = refreshTokenCookie.split(' ')[1]
    
    const payload =  verify(refreshToken, privateKey) as JwtPayload;

    const sessionId = payload.id;
    const session = await authModels.getSession(sessionId);
    if (!session) {
        throw new CustomError("Sesión no encontrada", 401);
    }
    const expires:Date = new Date();
    expires.setDate(expires.getDate()+7);
    const newSession:Session = {
        created_at: new Date(),
        expires_at: expires,
        user_id: session.user_id,
        status:"Active"
    }

    await authModels.updateSession(sessionId, newSession);



    const newAccessToken = jwt.sign({ id: payload.user_id, }, privateKey, { expiresIn: '1m' });
    const newRefreshToken = jwt.sign({id: payload.id, user_id:payload.user_id }, privateKey, { expiresIn: '2d' });
    res.cookie('accessToken', `Bearer ${newAccessToken}`,{httpOnly:true})
    res.cookie('refreshToken',`Bearer ${newRefreshToken}`,{httpOnly:true} )
    next()

}

export {refreshAccessToken}