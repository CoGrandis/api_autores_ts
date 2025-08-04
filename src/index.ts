import  express  from "express";
import "tsconfig-paths/register";
import cookieParser from 'cookie-parser';
import { router as libroRouter } from "./libro/modules/libroRoutes";
import { router as authRouter} from "./auth/modules/authRoutes";
import { apiKeyAuth } from "@middleware/apiKeyAuth";
import { errorHandler } from "@middleware/errorHandler";
import { verifyToken } from "@middleware/verifyToken";
import { error404 } from "@middleware/error404";
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRouter)

app.use(apiKeyAuth)
app.use('/api/libro',verifyToken,libroRouter)
app.use(error404)
app.use(errorHandler)

export {app}