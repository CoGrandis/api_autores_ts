import  express  from "express";
import { router as libroRouter } from "./libro/module/libroRoutes";

const app = express();
app.use(express.json())

app.use('/api/libro',libroRouter)
export {app}