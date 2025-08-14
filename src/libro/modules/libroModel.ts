import { prisma } from "../../database/prisma";
interface Libro {
    titulo: string;
    categoriaId: number;
    user_id:number;
}

const getAll = async(limit:number, offset:number)=>{
    return await prisma.libro.findMany({select:{id:true,titulo:true, categoria:{select:{categoria:true}}, user:{select:{username:true}}}, skip:offset, take:limit})
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
    return await prisma.libro.delete({where:{id}})
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