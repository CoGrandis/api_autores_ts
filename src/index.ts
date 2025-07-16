import  Express  from "express";
import { router as libroRouter } from "./libro/module/libroRoutes";

const app = Express();
app.use('/api/libro',libroRouter)
export {app}