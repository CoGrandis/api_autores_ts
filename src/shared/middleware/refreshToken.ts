import { env } from 'src/env';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/CustomError';
import jwt,{verify, decode, JwtPayload} from 'jsonwebtoken';
import { authModels, Session } from 'src/auth/modules/authModels';

const privateKey = env.PRIVATE_KEY
async function refreshAccessToken (req:Request, res:Response, next:NextFunction ) {
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
    const newSession:Session = {
        created_at: new Date(),
        expires_at: new Date(session.expires_at),
        user_id: session.user_id
    }

    await authModels.updateSession(sessionId, newSession);

    const newAccessToken = jwt.sign({ id: session.user_id }, privateKey, { expiresIn: '15m' });
    const newRefreshToken = jwt.sign({ id: session.id }, privateKey, { expiresIn: '2d' });

    res.cookie('accessToken', `Bearer ${newAccessToken}`, {
        httpOnly: true,
        maxAge: 1000 * 60 * 5, 
    });
    res.cookie('refreshToken', `Bearer ${newRefreshToken}`, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 48, 
    });

}

export {refreshAccessToken}