import { app } from "./index";
import dotenv from 'dotenv'
dotenv.config()
const api = app;
const port: number | string = process.env.PORT || 3000

api.listen(port,()=>{
    console.log(`Servidor corriendo en el puerto ${port}`);
})