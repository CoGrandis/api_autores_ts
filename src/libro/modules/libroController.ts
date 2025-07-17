import { Libro, libroModel } from "./libroModel";
import { Response, Request } from "express";
import { env } from "src/env";
const getLibros = async (req: Request, res: Response) => {
    try{
        // const limit = env.PAGE_SIZE
        // const {page} = req.query ?? 1
        // const offset = (page-1)* limit
        const libros = await libroModel.getAll();
        res.status(200).json(libros);
    }catch(err){
        if(err instanceof Error){
            res.status(401).json({error: err.message})
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
            res.status(400).json({error: err.message})
        }
        res.status(500).json({error: "Error 500"})
        
    }
}

const deleteLibro = async (req: Request, res: Response) => {
    try {
        const {id} =  req.params
        const libros = await  libroModel.deleteLibro(parseInt(id))
        console.log(libros)
        res.status(204)
    } catch (err) {
        if(err instanceof Error){
            res.status(401).json({error: err.message})
        }
        res.status(500).json({error: "Error 500"})
    }
}

const updateLibro = async (req: Request, res: Response) => {
    try {

        const {id} = req.params
        const {titulo, categoriaId, user_id} = req.body
        const libro:Libro = {
            titulo:titulo,
            categoriaId:categoriaId,
            user_id:user_id
        }
        const libros= await libroModel.updateLibro(libro, parseInt(id))
        res.status(201).json(libros)
    } catch (err) {
        if(err instanceof Error){
            res.status(401).json({error: err.message})
        }
        res.status(500).json({error: "Error 500"})
        
    }
}

const libroController={
    getLibros,
    insertLibro,
    deleteLibro,
    updateLibro
}

export {libroController}