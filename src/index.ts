import  express  from "express";
import "tsconfig-paths/register";
import { router as libroRouter } from "./libro/modules/libroRoutes";
import { apiKeyAuth } from "@middleware/apiKeyAuth";
const app = express();
app.use(express.json())
app.use(apiKeyAuth)

app.use('/api/libro',libroRouter)

export {app}