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

const insert = async (libro:Libro) => {
    const [rows] = await db.query('INSERT INTO libro (titulo, categoriaId, user_id) VALUES(?, ?, ?)',[libro.titulo, libro.categoriaId, libro.user_id]);
    return rows
}

const libroModel={   
    getAll,
    insert
}
export  {libroModel,Libro}