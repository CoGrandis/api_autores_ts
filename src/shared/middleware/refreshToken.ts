import { env } from 'src/env';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/CustomError';
import jwt, {verify, decode, JwtPayload} from 'jsonwebtoken';
import { authModels } from 'src/auth/modules/authModels';
const privateKey = env.PRIVATE_KEY
async function refreshAccessToken (req:Request, res:Response, next:NextFunction ) {
    console.log('refreshToken')
    const refreshTokenCookie = req.cookies['refreshToken']
    if(!refreshTokenCookie){
        throw new CustomError("",403)
    }
    const refreshToken = refreshTokenCookie.split(' ')[1]
    console.log(refreshToken)
    
    const payload =  verify(refreshToken, privateKey) as JwtPayload;

    const checkTokenSession = await  authModels.getSession(payload.id)
    if(!checkTokenSession){
        throw new CustomError("",401)
    }
    const newAccessToken = jwt.sign({ id: payload.user_id, }, privateKey, { expiresIn: '1m' });
    const newRefreshToken = jwt.sign({id: payload.id, user_id:payload.user_id }, privateKey, { expiresIn: '2d' });
    console.log(newRefreshToken)
    res.cookie('accessToken', `Bearer ${newAccessToken}`,{httpOnly:true})
    res.cookie('refreshToken',`Bearer ${newRefreshToken}`,{httpOnly:true} )
    next()

}

export {refreshAccessToken}