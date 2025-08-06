import { env } from 'src/env';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/CustomError';
import { authModels, Session } from 'src/auth/modules/authModels';
import jwt,{verify, JwtPayload, TokenExpiredError} from 'jsonwebtoken';
const privateKey = env.PRIVATE_KEY
async function verifyToken (req:Request, res:Response, next:NextFunction ) {    
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
    const verifyToken = verify(token,privateKey, async function (error:any, payload:any){
        if(error && error.name == "TokenExpiredError"){
            console.log("JWT expiro")
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
                        user_id: session.user_id,
                        status:"Active"
                    }
                
                    await authModels.updateSession(sessionId, newSession);

                const newAccessToken = jwt.sign({ id: payload.user_id, }, privateKey, { expiresIn: '10s' });
                const newRefreshToken = jwt.sign({id: payload.id, user_id:payload.user_id }, privateKey, { expiresIn: '2d' });
                console.log(newRefreshToken)
                res.cookie('accessToken', `Bearer ${newAccessToken}`,{httpOnly:true})
                res.cookie('refreshToken',`Bearer ${newRefreshToken}`,{httpOnly:true} )
                next()

        }
        if(payload){
            next()
        }
    })

}

export {verifyToken}