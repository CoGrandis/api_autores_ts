import dotenv from 'dotenv'
// import mysql,  from 'mysql2';
import mysql, { PoolOptions } from 'mysql2';
dotenv.config();

const credenciales:PoolOptions= {
    host: process.env.HOST,
    port: 3306,
    user: process.env.USER,
    password:process.env.PASSWORD,
    database: process.env.DATABASE
};

const db = mysql.createPool(credenciales);
const dbpromise = db.promise()
export {dbpromise};