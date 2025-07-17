import { dbpromise } from "../../config/db";
import { prisma } from "../../database/prisma";
const db = dbpromise;
interface Libro {
    titulo: string;
    categoriaId: number;
    user_id:number;
}

const getAll = async()=>{
    const [rows] = await prisma.libro.findMany({select:{titulo:true, categoria:true, user:true}})
    return rows
}

const insertLibro = async (libro:Libro) => {
    const rows:{} = await prisma.libro.create({
        data:{
            titulo:libro.titulo,
            categoriaId:libro.categoriaId,
            user_id:libro.user_id
        }})
    return rows
}

const deleteLibro = async (id:number) => {
    const rows:{}= await prisma.libro.delete({where:{id}})
    return rows
}

const updateLibro = async (libro:Libro, id:number) => {
    const rows:{} = await prisma.libro.update({data:{
        titulo:libro.titulo,
        categoriaId:libro.categoriaId,
        user_id:libro.user_id
    },where:{id}})
    return rows
}
const libroModel={   
    getAll,
    insertLibro,
    deleteLibro,
    updateLibro
}
export  {libroModel,Libro}