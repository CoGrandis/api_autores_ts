import { dbpromise } from "../../config/db";
const db = dbpromise;

interface Libro {
    titulo: string;
    categoriaId: number;
    user_id?:number;
}

const getAll = async()=>{
    const [rows] = await db.query('SELECT * FROM libro');
    return rows
}

const insertLibro = async (libro:Libro) => {
    const [rows] = await db.query('INSERT INTO libro (titulo, categoriaId, user_id) VALUES(?, ?, ?)',[libro.titulo, libro.categoriaId, libro.user_id]);
    return rows
}

const deleteLibro = async (id:number) => {
    const [rows] = await db.query('DELETE FROM libro WHERE id=?',[id]);
    return rows
}

const updateLibro = async (libro:Libro, id:number) => {
    const[rows] = await db.query('UPDATE libro SET titulo = ?, categoriaId = ?, user_id = ? WHERE id = ?',[libro.titulo, libro.categoriaId, libro.user_id, id])
    return rows
}
const libroModel={   
    getAll,
    insertLibro,
    deleteLibro,
    updateLibro
}
export  {libroModel,Libro}