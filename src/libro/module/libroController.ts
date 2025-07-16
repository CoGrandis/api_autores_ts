import { QueryResult } from "mysql2";
import { Libro, libroModel } from "./libroModel";
import { Response, Request } from "express";

const getLibros = async (req: Request, res: Response) => {
    try{
        const libros = await libroModel.getAll();
        res.status(200).json(libros);
    }catch(err){
        if(err instanceof Error){
            console.log(err.message)
        }
        res.status(500).json({error: "Error 500"})
    }
}
const insertLibro = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const {titulo, categoriaId, user_id} = req.body
        const libro:Libro = {
            titulo:titulo,
            categoriaId:categoriaId,
            user_id:user_id
        }
        const libros= await libroModel.insertLibro(libro)
        res.status(201).json(libros)
    } catch (err) {
        if(err instanceof Error){
            console.log(err.message)
        }
        res.status(500).json({error: "Error 500"})
        
    }
}

const deleteLibro = async (req: Request, res: Response) => {
    try {
        const {id} =  req.params
        const libros = await  libroModel.deleteLibro(parseInt(id))
        res.status(204).json(libros)
    } catch (err) {
        if(err instanceof Error){
            console.log(err.message)
        }
        res.status(500).json({error: "Error 500"})
    }
}
const libroController={
    getLibros,
    insertLibro
}

export {libroController}