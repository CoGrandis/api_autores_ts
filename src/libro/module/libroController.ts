import { Libro, libroModel } from "./libroModel";
import { Response, Request } from "express";

const getLibros = async (req: Request, res: Response) => {
    try{
        const libros = await libroModel.getAll();
        res.status(200).json(libros);
    }catch(err){
        console.log(err)
        // res.status(500).json({error: err.message})
    }
}
const insertLibro = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        
    }
}
const libroController={
    getLibros
}

export {libroController}